import { PlantInfo } from '../components/PlantCard';
import { analyzeImageWithGemini } from './geminiService';
import { v4 as uuidv4 } from 'uuid';

// Plant database - exported so it can be accessed and modified
export const plantDatabase: PlantInfo[] = [
  {
    id: 'monstera-deliciosa',
    name: 'Red Gerbera Daisy',
    scientificName: 'Gerbera jamesonii',
    image: '/assets/plants/1.png',
    wateringNeeds: 'medium',
    sunlight: 'medium',
    temperature: '65-85°F',
    price: 'Rs. 359/-',
    description: 'Gerbera Daisies are known for their large, vibrant flowers.'
  },
  {
    id: 'calathea-plant',
    name: 'Gerbera Daisy',
    scientificName: 'Gerbera jamesonii',
    image: '/assets/plants/2.png',
    wateringNeeds: 'medium',
    sunlight: 'high',
    temperature: '65-75°F',
    price: 'Rs. 359/-',
    description: 'Gerbera Daisies are vibrant flowering plants known for their large, daisy-like blooms in a variety of colors.'
  },
  {
    id: 'snake-plant',
    name: 'Pink Adenium',
    scientificName: 'Adenium obesum',
    image: '/assets/plants/3.png',
    wateringNeeds: 'medium',
    sunlight: 'high',
    temperature: '60-85°F',
    price: 'Rs. 359/-',
    description: 'The Pink Adenium, also known as Desert Rose, is a succulent plant with thick stems and striking pink flowers.'
  },
  {
    id: 'pothos-plant',
    name: 'Chinese Hibiscus',
    scientificName: 'Hibiscus rosa-sinensis',
    image: '/assets/plants/4.png',
    wateringNeeds: 'medium',
    sunlight: 'high',
    temperature: '65-80°F',
    price: 'Rs. 359/-',
    description: 'The Chinese hibiscus is a flowering plant known for its large, showy flowers.'
  },
  // other plants can remain in the original plantService.ts file
];

// Plant identification service using Google Gemini API
export const identifyPlant = async (imageUrl: string): Promise<PlantInfo> => {
  try {
    console.log("Starting plant identification process...");
    
    // Send the image to the Gemini API for analysis
    const geminiResponse = await analyzeImageWithGemini(imageUrl);
    console.log("Received response from Gemini API");
    
    // Parse the JSON response from Gemini
    let plantData: any;
    try {
      // With our improved Gemini service, the response should always be valid JSON
      plantData = JSON.parse(geminiResponse);
      console.log("Successfully parsed JSON:", plantData);
    } catch (parseError: any) {
      console.error('Failed to parse Gemini response as JSON:', parseError);
      throw new Error(`Invalid JSON response: ${parseError.message}`);
    }
    
    // Generate care instructions based on the plant's needs
    const careInstructions = {
      watering: getWateringInstructions(plantData.name, plantData.wateringNeeds),
      light: getLightInstructions(plantData.name, plantData.sunlight),
      soil: "Use well-draining soil that's appropriate for this plant type.",
      humidity: `Maintain typical indoor humidity and temperature around ${plantData.temperature}.`,
      fertilizing: "Apply a balanced fertilizer during the growing season as needed."
    };
    
    // Extract facts from the description
    const facts = generateFactsFromDescription(plantData.description);
    
    // Create a plant info object with the data from Gemini
    const identifiedPlant: PlantInfo = {
      id: plantData.scientificName 
        ? plantData.scientificName.toLowerCase().replace(/\s+/g, '-') 
        : `plant-${uuidv4().slice(0, 8)}`,
      name: plantData.name || 'Unknown Plant',
      scientificName: plantData.scientificName || 'Species unknown',
      image: imageUrl, // Use the uploaded image as the plant image
      wateringNeeds: plantData.wateringNeeds || 'medium',
      sunlight: plantData.sunlight || 'medium',
      temperature: plantData.temperature || '65-75°F',
      description: plantData.description || 'No description available.',
      careInstructions: careInstructions,
      facts: facts
    };
    
    console.log("Final identified plant object:", identifiedPlant);
    return identifiedPlant;
  } catch (error) {
    console.error('Error identifying plant:', error);
    
    // Create a user-friendly error message
    const unknownPlant: PlantInfo = {
      id: `unknown-plant-${uuidv4().slice(0, 8)}`,
      name: 'Try Again',
      scientificName: 'Image processing issue',
      image: imageUrl,
      wateringNeeds: 'medium',
      sunlight: 'medium',
      temperature: '65-75°F',
      description: `We had trouble processing this image. Try uploading a clear, well-lit photo of the plant with visible leaves and flowers if possible.`,
      careInstructions: {
        watering: "Not available for this image",
        light: "Not available for this image",
        soil: "Not available for this image",
        humidity: "Not available for this image",
        fertilizing: "Not available for this image"
      },
      facts: [
        "Clear images help AI identify plants more accurately.",
        "Try to capture the whole plant including leaves and flowers.",
        "Good lighting improves identification accuracy.",
        "Avoid blurry or dark images for better results.",
        "You can try with a different image of the same plant."
      ]
    };
    
    return unknownPlant;
  }
};

// Helper functions for generating care instructions
function getWateringInstructions(plantName: string, wateringNeeds: string): string {
  switch (wateringNeeds) {
    case 'low':
      return `Water sparingly. Allow soil to dry completely between waterings. ${plantName} is drought-tolerant.`;
    case 'medium':
      return `Water when the top inch of soil feels dry to the touch. ${plantName} prefers consistent moisture but not soggy conditions.`;
    case 'high':
      return `Keep soil consistently moist. ${plantName} requires regular watering and doesn't tolerate drying out.`;
    default:
      return `Water moderately, adjusting based on season and environment.`;
  }
}

function getLightInstructions(plantName: string, sunlight: string): string {
  switch (sunlight) {
    case 'low':
      return `Place in shade or indirect light. ${plantName} can thrive in low light conditions.`;
    case 'medium':
      return `Provide bright, filtered light. ${plantName} does best with indirect sunlight.`;
    case 'high':
      return `Position in a bright location with direct sunlight. ${plantName} needs at least 6 hours of sun daily.`;
    default:
      return `Provide moderate light, avoiding harsh direct sunlight.`;
  }
}

function generateFactsFromDescription(description: string): string[] {
  if (!description || description.length < 10) {
    return [
      "Plants improve air quality and reduce stress.",
      "Regular care helps plants thrive and stay healthy.",
      "Proper light is essential for photosynthesis.",
      "Most houseplants originated in tropical regions.",
      "Plants can communicate through chemical signals."
    ];
  }
  
  // Try to create facts from the description
  const sentences = description.split(/[.!?]+/).filter(s => s.trim().length > 10);
  
  // Take up to 5 facts from the description
  const facts = sentences.slice(0, 5).map(s => s.trim() + '.');
  
  // If we don't have enough facts, add some generic ones
  while (facts.length < 5) {
    const genericFacts = [
      `${description.split(' ')[0]} plants can enhance your home decor.`,
      "Consistent care routine leads to healthier plants.",
      "Plants respond to their environment and care.",
      "Observing your plant helps you understand its needs.",
      "Plants are living organisms that change and grow over time."
    ];
    
    // Add a generic fact
    const unusedFact = genericFacts.find(f => !facts.includes(f));
    if (unusedFact) facts.push(unusedFact);
    else break;
  }
  
  return facts;
}

// Other exported functions from the original file
export const getAllPlants = (): PlantInfo[] => {
  return plantDatabase;
};

export const getFeaturedPlants = (count: number = 3): PlantInfo[] => {
  return plantDatabase.slice(0, count);
};

export const getPlantById = (id: string): PlantInfo | undefined => {
  return plantDatabase.find(plant => plant.id === id);
};

export const searchPlants = (query: string): PlantInfo[] => {
  const lowercaseQuery = query.toLowerCase();
  return plantDatabase.filter(plant => 
    plant.name.toLowerCase().includes(lowercaseQuery) || 
    plant.scientificName.toLowerCase().includes(lowercaseQuery)
  );
};

// Add an identified plant to the database
export const savePlantToDatabase = (plant: PlantInfo): boolean => {
  try {
    // Check if plant with same ID already exists
    const existingPlantIndex = plantDatabase.findIndex(p => p.id === plant.id);
    
    if (existingPlantIndex >= 0) {
      // Update existing plant
      plantDatabase[existingPlantIndex] = plant;
    } else {
      // Add new plant
      plantDatabase.push(plant);
    }
    
    console.log('Plant saved to database:', plant.name);
    return true;
  } catch (error) {
    console.error('Error saving plant to database:', error);
    return false;
  }
};
