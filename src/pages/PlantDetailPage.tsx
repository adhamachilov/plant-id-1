import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Droplets, Sun, ThermometerSnowflake, BookOpen, Heart, Share2 } from 'lucide-react';
import { getPlantById, getFeaturedPlants } from '../services/plantService';
import { PlantInfo } from '../components/PlantCard';
import PlantGrid from '../components/PlantGrid';
import AnimatedElement from '../components/AnimatedElement';

const PlantDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [plant, setPlant] = useState<PlantInfo | null>(null);
  const similarPlants = getFeaturedPlants(4);

  useEffect(() => {
    if (id) {
      const plantData = getPlantById(id);
      if (plantData) {
        setPlant(plantData);
      }
    }
  }, [id]);

  if (!plant) {
    return (
      <div className="bg-emerald-950 min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-emerald-400 text-lg mb-4">Plant not found</p>
          <Link 
            to="/plants" 
            className="inline-flex items-center text-emerald-500 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Plants
          </Link>
        </div>
      </div>
    );
  }

  // Helper function to render the appropriate level indicators
  const renderLevelIndicator = (level: 'low' | 'medium' | 'high', label: string) => {
    const levels = {
      low: 1,
      medium: 2,
      high: 3
    };
    
    return (
      <div className="flex flex-col">
        <span className="text-sm text-emerald-300 mb-1">{label}</span>
        <div className="flex space-x-1 items-center">
          {[1, 2, 3].map((value) => (
            <div 
              key={value}
              className={`w-8 h-2 rounded-full ${value <= levels[level] ? 'bg-emerald-500' : 'bg-emerald-900'}`}
            />
          ))}
          <span className="ml-2 text-sm text-emerald-300 capitalize">{level}</span>
        </div>
      </div>
    );
  };

  // Generate plant facts based on the plant type with accurate information from research
  const generateFacts = (plant: PlantInfo) => {
    if (plant.name.includes('Gerbera')) {
      return [
        "Discovered in 1880 by Robert Jameson in South Africa during a gold mining operation.",
        "Available in all colors except true blue - any blue gerbera daisies are artificially colored.",
        "Fifth most popular cut flower worldwide, after roses, carnations, chrysanthemums, and tulips.",
        "Can last up to 14 days in a vase with proper care.",
        "The flower is actually a composite of hundreds of tiny individual flowers."
      ];
    } 
    else if (plant.name.includes('Hibiscus')) {
      return [
        "The national flower of Malaysia and the state flower of Hawaii.",
        "Individual flowers last only 1-2 days, but plants bloom continuously throughout the season.",
        "Contains vitamin C and is used to make herbal teas in many cultures.",
        "Has been used in traditional medicine for centuries to treat high blood pressure.",
        "The red varieties are especially popular in religious ceremonies in Hindu culture."
      ];
    }
    else if (plant.name.includes('Adenium')) {
      return [
        "Often called 'Desert Rose' because of its rose-like flowers and ability to thrive in arid conditions.",
        "The swollen caudex (base) stores water, allowing it to survive long periods of drought.",
        "All parts of the plant contain toxic cardiac glycosides, so care should be taken around children and pets.",
        "Highly prized for bonsai cultivation due to its thick trunk and miniaturization potential.",
        "In its native habitat, can grow up to 10 feet tall and live for decades."
      ];
    }
    else {
      return [
        "Features bright, showy flowers that attract pollinators.",
        "Adds a pop of color to gardens and indoor spaces.",
        "Relatively easy to care for with proper attention.",
        "Popular for both beginners and experienced gardeners.",
        "Can enhance mood and create a positive environment."
      ];
    }
  };
  
  const facts = generateFacts(plant);

  // Generate care instructions based on the plant type with accurate information from research
  const generateCareInstructions = (plant: PlantInfo) => {
    if (plant.name.includes('Gerbera')) {
      return {
        watering: "Water when the top inch of soil is dry. Avoid overhead watering as wet leaves can lead to powdery mildew and other fungal diseases. Use room temperature water whenever possible.",
        light: "Place in bright, indirect light for 6-8 hours daily. Morning sun with afternoon shade is ideal, especially in hot climates. Too little light results in fewer blooms.",
        soil: "Plant in rich, well-draining soil with a pH between 5.5 and 6.5. A mix formulated for flowering houseplants with added perlite works well to ensure proper drainage.",
        humidity: "Prefers moderate humidity (40-50%). In dry environments, use a pebble tray with water near the plant, but avoid misting as this can promote leaf diseases.",
        fertilizing: "Apply a phosphorus-rich, water-soluble fertilizer (such as 15-30-15) diluted to half strength every 2 weeks during the growing season. Reduce to monthly in winter."
      };
    } 
    else if (plant.name.includes('Hibiscus')) {
      return {
        watering: "Keep soil consistently moist but not waterlogged. Water thoroughly when the top inch of soil feels dry. Increase watering during blooming and hot periods; reduce in winter.",
        light: "Requires at least 6 hours of direct sunlight daily for abundant flowering. Place near south or west-facing windows when grown indoors. Protect from intense afternoon sun in very hot regions.",
        soil: "Plant in rich, well-draining soil with a pH between 6.0-6.5. A mix of quality potting soil with 25% perlite or pumice ensures good drainage while retaining necessary moisture.",
        humidity: "Thrives in moderate to high humidity (50-60%). Increase humidity by grouping plants together or using a humidity tray. Regular misting benefits the plant in dry climates.",
        fertilizing: "Feed with a high-potassium fertilizer (such as 10-10-20) every 2 weeks during growing season. Reduce to monthly in fall and stop completely in winter to allow dormancy."
      };
    }
    else if (plant.name.includes('Adenium')) {
      return {
        watering: "Water thoroughly but infrequently, allowing soil to dry completely between waterings. During active growth (spring/summer), water once every 7-10 days. In winter, reduce to once every 3-4 weeks or when the plant shows signs of thirst.",
        light: "Demands at least 6-8 hours of direct sunlight daily. Place in your brightest window, preferably south-facing. Insufficient light results in leggy growth and few flowers.",
        soil: "Must have extremely well-draining soil. Use a mix of 50% cactus soil, 25% perlite, and 25% coarse sand or pumice. Never use regular potting soil as it retains too much moisture.",
        humidity: "Prefers dry air conditions (30-40% humidity). Excessive humidity can lead to root rot and fungal problems. Ensure good air circulation around the plant at all times.",
        fertilizing: "Apply a phosphorus-rich, low-nitrogen fertilizer (such as 5-15-5) diluted to half strength once monthly during spring and summer growing season. Do not fertilize in fall or winter."
      };
    }
    else {
      return {
        watering: plant.wateringNeeds === 'high' ? 
          "Keep soil consistently moist." : 
          plant.wateringNeeds === 'medium' ? 
          "Water when the top inch of soil feels dry." : 
          "Allow soil to dry between waterings.",
        light: plant.sunlight === 'high' ? 
          "Thrives in bright, direct sunlight." : 
          plant.sunlight === 'medium' ? 
          "Prefers bright, indirect light." : 
          "Does well in low to moderate light conditions.",
        soil: "Well-draining potting mix appropriate for this plant type.",
        humidity: `Maintain typical indoor humidity and temperature around ${plant.temperature}.`,
        fertilizing: "Apply a balanced fertilizer during the growing season as needed."
      };
    }
  };
  
  const careInstructions = generateCareInstructions(plant);

  return (
    <div className="bg-emerald-950 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <AnimatedElement>
            <Link 
              to="/plants" 
              className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-8 transition-colors duration-300"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Plants
            </Link>
          </AnimatedElement>

          <AnimatedElement delay={0.1}>
            <div className="bg-emerald-900/70 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl mb-16 border border-emerald-500/30">
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <AnimatedElement delay={0.2}>
                      <div className="mb-6 rounded-2xl overflow-hidden">
                        <img 
                          src={plant.image} 
                          alt={plant.name} 
                          className="w-full h-auto"
                        />
                      </div>
                    </AnimatedElement>
                    
                    <AnimatedElement delay={0.3}>
                      <div className="bg-emerald-950/50 rounded-2xl p-5 mb-6">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                          <BookOpen className="h-5 w-5 mr-2 text-emerald-400" />
                          Interesting Facts
                        </h3>
                        <ul className="space-y-3">
                          {facts.map((fact, index) => (
                            <li key={index} className="flex items-start">
                              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mt-1.5 mr-2 flex-shrink-0"></span>
                              <span className="text-emerald-200 text-sm">{fact}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AnimatedElement>
                    
                    <AnimatedElement delay={0.4}>
                      <div className="flex space-x-4">
                        <button className="flex items-center justify-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-emerald-950 flex-1 py-3 rounded-xl font-medium transition-all duration-300">
                          <Heart className="h-5 w-5" />
                          <span>Save</span>
                        </button>
                        <button className="flex items-center justify-center space-x-2 bg-transparent border border-emerald-500 hover:bg-emerald-800 text-emerald-400 flex-1 py-3 rounded-xl font-medium transition-all duration-300">
                          <Share2 className="h-5 w-5" />
                          <span>Share</span>
                        </button>
                      </div>
                    </AnimatedElement>
                  </div>
                  
                  <div>
                    <AnimatedElement delay={0.2}>
                      <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{plant.name}</h1>
                      <p className="text-emerald-400 italic mb-4">{plant.scientificName}</p>
                      
                      <p className="text-emerald-200 mb-6">{plant.description}</p>
                    </AnimatedElement>
                    
                    <AnimatedElement delay={0.3}>
                      <div className="space-y-4 mb-8">
                        {renderLevelIndicator(plant.wateringNeeds, 'Water Needs')}
                        {renderLevelIndicator(plant.sunlight, 'Sunlight')}
                        <div className="flex flex-col">
                          <span className="text-sm text-emerald-300 mb-1">Temperature</span>
                          <div className="flex items-center">
                            <ThermometerSnowflake className="h-5 w-5 text-emerald-400 mr-2" />
                            <span className="text-emerald-300">{plant.temperature}</span>
                          </div>
                        </div>
                      </div>
                    </AnimatedElement>
                    
                    <AnimatedElement delay={0.4}>
                      <div className="bg-emerald-950/50 rounded-2xl p-5">
                        <h3 className="text-lg font-semibold text-white mb-4">Care Instructions</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-emerald-400 font-medium mb-1">Watering</h4>
                            <p className="text-emerald-200 text-sm">{careInstructions.watering}</p>
                          </div>
                          <div>
                            <h4 className="text-emerald-400 font-medium mb-1">Light</h4>
                            <p className="text-emerald-200 text-sm">{careInstructions.light}</p>
                          </div>
                          <div>
                            <h4 className="text-emerald-400 font-medium mb-1">Soil</h4>
                            <p className="text-emerald-200 text-sm">{careInstructions.soil}</p>
                          </div>
                          <div>
                            <h4 className="text-emerald-400 font-medium mb-1">Humidity</h4>
                            <p className="text-emerald-200 text-sm">{careInstructions.humidity}</p>
                          </div>
                          <div>
                            <h4 className="text-emerald-400 font-medium mb-1">Fertilizing</h4>
                            <p className="text-emerald-200 text-sm">{careInstructions.fertilizing}</p>
                          </div>
                        </div>
                      </div>
                    </AnimatedElement>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedElement>
        </div>

        <AnimatedElement delay={0.5}>
          <PlantGrid 
            plants={similarPlants.filter(p => p.id !== plant.id)} 
            title="Similar Plants You Might Like"
            description="Browse other plants with similar care requirements"
          />
        </AnimatedElement>
      </div>
    </div>
  );
};

export default PlantDetailPage;