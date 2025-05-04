// Gemini API integration for plant identification
const API_KEY = "AIzaSyBjev7qHDmO-ChVURmM1YG2JelOJ8o21uQ";

// Updated to use the recommended non-deprecated model
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export interface GeminiResponse {
  candidates?: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
  promptFeedback?: {
    blockReason?: string;
  };
}

/**
 * Sends an image to Google's Gemini API for plant identification
 * @param imageUrl Base64 encoded image data or data URL
 * @returns A JSON string with plant identification information
 */
export async function analyzeImageWithGemini(imageUrl: string): Promise<string> {
  // Extract base64 data and MIME type from data URL
  let base64Data: string;
  let mimeType: string = 'image/jpeg';
  
  if (imageUrl.startsWith('data:')) {
    const matches = imageUrl.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
    if (matches && matches.length === 3) {
      mimeType = matches[1];
      base64Data = matches[2];
    } else {
      base64Data = imageUrl.split(',')[1] || imageUrl;
    }
  } else {
    base64Data = imageUrl;
  }
  
  console.log(`Processing image with MIME type: ${mimeType}`);
  
  try {
    // Building the request body according to Gemini API specifications
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `You are a plant identification expert. The image shows a plant. 
              
Analyze the image and provide the following plant information:
1. Common name (be specific if possible)
2. Scientific name (genus and species)
3. Watering needs (exactly one of: low, medium, high)
4. Sunlight requirements (exactly one of: low, medium, high)
5. Ideal temperature range in Fahrenheit
6. Brief description of the plant with care tips

Format your response as a valid JSON object with these fields: 
name, scientificName, wateringNeeds, sunlight, temperature, description.
Response must be only valid JSON that can be parsed with JSON.parse().`
            },
            {
              inline_data: {
                mime_type: mimeType,
                data: base64Data
              }
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 800,
        topK: 40,
        topP: 0.95
      }
    };

    console.log("Sending request to Gemini API...");
    
    // Make API request with proper headers
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    // Log full response status for debugging
    console.log(`Gemini API response status: ${response.status} ${response.statusText}`);
    
    // Process API response
    const responseText = await response.text();
    console.log("Raw API response:", responseText.substring(0, 200) + "...");
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (error) {
      console.error("Failed to parse API response as JSON:", error);
      throw new Error("Invalid response format from Gemini API");
    }
    
    // Handle error responses
    if (!response.ok) {
      console.error("API Error:", data.error || response.statusText);
      throw new Error(`Gemini API error: ${data.error?.message || response.statusText}`);
    }
    
    // Extract text content from response
    if (data.candidates && data.candidates.length > 0 && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts.length > 0) {
      
      const textResponse = data.candidates[0].content.parts[0].text;
      console.log("API text response:", textResponse);
      
      // Try to extract JSON from the response text
      try {
        // Check if the response contains a code block with JSON
        let jsonMatch = textResponse.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        if (jsonMatch) {
          console.log("Found JSON in code block");
          const jsonContent = jsonMatch[1].trim();
          // Validate it's proper JSON
          const plantData = JSON.parse(jsonContent);
          return JSON.stringify(plantData);
        }
        
        // If no code block, try to find a JSON object in the text
        jsonMatch = textResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          console.log("Found JSON object in text");
          const jsonContent = jsonMatch[0].trim();
          // Validate it's proper JSON
          const plantData = JSON.parse(jsonContent);
          return JSON.stringify(plantData);
        }
        
        // If no JSON object, try to parse the entire response
        const plantData = JSON.parse(textResponse);
        return JSON.stringify(plantData);
      } catch (error) {
        console.error("Failed to extract JSON from text response:", error);
        
        // If we can't extract JSON, try to parse the text to create a JSON object
        return createJsonFromText(textResponse);
      }
    } else {
      console.error("No content in API response:", data);
      throw new Error("No content returned from Gemini API");
    }
  } catch (error) {
    console.error("Error in plant identification:", error);
    
    // Always return valid JSON with error information
    return JSON.stringify({
      name: "Identification Error",
      scientificName: "Error processing image",
      wateringNeeds: "medium",
      sunlight: "medium",
      temperature: "65-75°F",
      description: `We encountered an error analyzing this image: ${error.message}. Please try a different image with clearer details of the plant.`
    });
  }
}

// Create structured JSON from unstructured text response
function createJsonFromText(text: string): string {
  // Extract potential plant name
  const nameMatch = text.match(/(?:plant is|identified as|appears to be|looks like)(?: a| an)? ([A-Z][a-zA-Z\s]+?)(?:\.|\,|\n|$)/i);
  const name = nameMatch ? nameMatch[1].trim() : "Unidentified Plant";
  
  // Extract potential scientific name
  const scientificMatch = text.match(/(?:scientific name|botanical name|latin name|genus species)(?:\s*(?:is|:))?\s*([A-Z][a-z]+ [a-z]+)(?:\.|\,|\n|$)/i);
  const scientificName = scientificMatch ? scientificMatch[1].trim() : "Species unknown";
  
  // Extract watering needs
  let wateringNeeds = "medium";
  if (text.match(/(?:drought[- ]?tolerant|water sparingly|low water|rarely water)/i)) {
    wateringNeeds = "low";
  } else if (text.match(/(?:water frequently|keep moist|high water|water daily|water often)/i)) {
    wateringNeeds = "high";
  }
  
  // Extract sunlight needs
  let sunlight = "medium";
  if (text.match(/(?:low light|shade|indirect light|no direct sun)/i)) {
    sunlight = "low";
  } else if (text.match(/(?:full sun|direct sun|bright light|high light)/i)) {
    sunlight = "high";
  }
  
  // Extract description
  const description = text.replace(/^.*?\n\n/s, '').substring(0, 500) || 
    "Plant details could not be extracted from the identification results.";
  
  // Create structured plant data
  const plantData = {
    name,
    scientificName,
    wateringNeeds,
    sunlight,
    temperature: "65-75°F",
    description
  };
  
  return JSON.stringify(plantData);
}

// Direct plant identification fallback function - uses mock data for different plants
async function directPlantIdentification(imageData: string): Promise<string> {
  console.log("Using direct identification fallback");
  
  // Simulate a delay to mimic API processing
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Get a random plant from our mock database to demonstrate variety
  const mockPlants = [
    {
      name: "Snake Plant",
      scientificName: "Sansevieria trifasciata",
      wateringNeeds: "low",
      sunlight: "low",
      temperature: "65-85°F",
      description: "Snake plant is a hardy succulent with tall, stiff leaves that point upward. Its adaptability to various light conditions and its ability to purify air make it an excellent houseplant. It requires very little water and can withstand periods of neglect."
    },
    {
      name: "Monstera Deliciosa",
      scientificName: "Monstera deliciosa",
      wateringNeeds: "medium",
      sunlight: "medium",
      temperature: "65-85°F",
      description: "Monstera deliciosa is famous for its large, glossy leaves with natural holes and deep splits. Also known as the Swiss Cheese Plant, it's a popular indoor choice for its dramatic foliage and relatively easy care requirements. It prefers bright, indirect light and regular watering."
    },
    {
      name: "Peace Lily",
      scientificName: "Spathiphyllum wallisii",
      wateringNeeds: "medium",
      sunlight: "low",
      temperature: "65-80°F",
      description: "The Peace Lily is known for its elegant white blooms and glossy dark green leaves. It's excellent for purifying indoor air and thrives in low light conditions, making it perfect for bathrooms and offices. It prefers consistently moist soil but can recover from occasional underwatering."
    },
    {
      name: "Fiddle Leaf Fig",
      scientificName: "Ficus lyrata",
      wateringNeeds: "medium",
      sunlight: "high",
      temperature: "60-75°F",
      description: "The Fiddle Leaf Fig is a popular indoor tree with large, violin-shaped leaves. It makes a striking statement in any space but requires consistent care. It needs bright, indirect light, regular watering, and protection from drafts and temperature fluctuations."
    },
    {
      name: "Aloe Vera",
      scientificName: "Aloe barbadensis miller",
      wateringNeeds: "low",
      sunlight: "high",
      temperature: "55-80°F",
      description: "Aloe vera is a succulent plant species known for its medicinal properties. The gel inside its thick, fleshy leaves has been used for centuries to treat skin conditions and minor burns. It's an easy-care plant that requires minimal watering and plenty of sunlight."
    }
  ];
  
  // Select a random plant from our mock database
  const randomPlant = mockPlants[Math.floor(Math.random() * mockPlants.length)];
  return JSON.stringify(randomPlant);
}
