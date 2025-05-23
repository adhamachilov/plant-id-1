import React from 'react';
import { ShoppingBag, Droplets, Leaf, ThermometerSnowflake } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface PlantInfo {
  id: string;
  name: string;
  scientificName: string;
  image: string;
  wateringNeeds: 'low' | 'medium' | 'high';
  sunlight: 'low' | 'medium' | 'high';
  temperature: string;
  description: string;
  price?: string;
  careInstructions?: {
    watering: string;
    light: string;
    soil: string;
    humidity: string;
    fertilizing: string;
  };
  facts?: string[];
}

interface PlantCardProps {
  plant: PlantInfo;
  featured?: boolean;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, featured = false }) => {

  // Check if the image is likely from user analysis (with background) or a PNG without background
  const isUserAnalyzedImage = plant.image.startsWith('data:image') || !plant.image.includes('/assets/');
  
  if (featured) {
    return (
      <div className="relative bg-emerald-900/30 backdrop-blur-xl rounded-xl overflow-hidden shadow-lg border border-emerald-500/30 h-full flex flex-col justify-between hover:shadow-emerald-700/20 hover:shadow-xl transition-all duration-300 border-line-animation featured-line-animation">
        <span></span>
        <span></span>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 relative h-64 md:h-auto overflow-visible flex items-center justify-center" style={{ zIndex: 5 }}>
            {isUserAnalyzedImage ? (
              <div className="rounded-full w-48 h-48 bg-emerald-900/70 backdrop-blur-sm p-1 border border-emerald-600/30 overflow-hidden">
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            ) : (
              <img
                src={plant.image}
                alt={plant.name}
                className="w-full h-full object-contain"
                style={{ filter: 'drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.2))', transform: 'translateY(-20%)', position: 'relative', zIndex: 5 }}
              />
            )}
          </div>
          <div className="md:w-1/2 p-6 md:p-8">
            <h3 className="text-2xl font-bold text-white mb-1">{plant.name}</h3>
            <p className="text-emerald-400 text-sm italic mb-4">{plant.scientificName}</p>
            
            <p className="text-emerald-200 mb-6 line-clamp-3">{plant.description}</p>
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold text-white">{plant.price || 'Rs. 359/-'}</span>
              
              <Link
                to={`/plants/${plant.id}`}
                className="inline-flex items-center justify-center space-x-2 bg-emerald-600/80 hover:bg-emerald-500/90 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Add to Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-emerald-900/25 backdrop-blur-xl rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-emerald-600/20 hover:-translate-y-1 pt-24 px-4 pb-5 border border-emerald-500/30 relative w-72 min-h-[320px] flex flex-col border-line-animation">
      <span></span>
      <span></span>
      <div className="absolute top-0 left-0 right-0 flex justify-center" style={{ transform: 'translateY(-50%)', zIndex: 5 }}>
        <div className={`flex items-center justify-center ${isUserAnalyzedImage ? 'rounded-full h-36 w-36 bg-emerald-900/70 backdrop-blur-sm p-1 border border-emerald-600/30 overflow-hidden' : ''}`}>
          <img
            src={plant.image}
            alt={plant.name}
            className={isUserAnalyzedImage ? "h-full w-full object-cover rounded-full" : "h-56 object-contain"}
            style={isUserAnalyzedImage ? { } : { filter: 'drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.3))' }}
          />
        </div>
      </div>
      
      <div className="text-center mt-2">
        <h3 className="text-xl font-medium text-white mb-1.5">{plant.name}</h3>
        <p className="text-emerald-300/80 text-base italic mb-3">{plant.scientificName}</p>
        <p className="text-gray-400/90 text-base mb-5 line-clamp-2 mx-auto max-w-[90%]">
          {plant.description.length > 70 ? plant.description.substring(0, 70) + '...' : plant.description}
        </p>
        
        <div className="flex justify-center gap-4 mb-4">
          {plant.name.includes('Gerbera') ? (
            <>
              <div className="flex flex-col items-center">
                <Droplets className="h-5 w-5 text-emerald-400/90 mb-1" />
                <span className="text-sm text-emerald-300 font-medium">Medium</span>
              </div>
              <div className="flex flex-col items-center">
                <Leaf className="h-5 w-5 text-emerald-400/90 mb-1" />
                <span className="text-sm text-emerald-300 font-medium">Direct</span>
              </div>
              <div className="flex flex-col items-center">
                <ThermometerSnowflake className="h-5 w-5 text-emerald-400/90 mb-1" />
                <span className="text-sm text-emerald-300 font-medium">65-75°F</span>
              </div>
            </>
          ) : plant.name.includes('Hibiscus') ? (
            <>
              <div className="flex flex-col items-center">
                <Droplets className="h-5 w-5 text-emerald-400/90 mb-1" />
                <span className="text-sm text-emerald-300 font-medium">Medium</span>
              </div>
              <div className="flex flex-col items-center">
                <Leaf className="h-5 w-5 text-emerald-400/90 mb-1" />
                <span className="text-sm text-emerald-300 font-medium">Direct</span>
              </div>
              <div className="flex flex-col items-center">
                <ThermometerSnowflake className="h-5 w-5 text-emerald-400/90 mb-1" />
                <span className="text-sm text-emerald-300 font-medium">65-80°F</span>
              </div>
            </>
          ) : plant.name.includes('Adenium') ? (
            <>
              <div className="flex flex-col items-center">
                <Droplets className="h-5 w-5 text-emerald-400/90 mb-1" />
                <span className="text-sm text-emerald-300 font-medium">Medium</span>
              </div>
              <div className="flex flex-col items-center">
                <Leaf className="h-5 w-5 text-emerald-400/90 mb-1" />
                <span className="text-sm text-emerald-300 font-medium">Direct</span>
              </div>
              <div className="flex flex-col items-center">
                <ThermometerSnowflake className="h-5 w-5 text-emerald-400/90 mb-1" />
                <span className="text-sm text-emerald-300 font-medium">60-85°F</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center">
                <Droplets className="h-5 w-5 text-emerald-400/90 mb-1" />
                <span className="text-sm text-emerald-300 font-medium">
                  {plant.wateringNeeds === 'low' ? 'Low' : plant.wateringNeeds === 'medium' ? 'Medium' : 'High'}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Leaf className="h-5 w-5 text-emerald-400/90 mb-1" />
                <span className="text-sm text-emerald-300 font-medium">
                  {plant.sunlight === 'low' ? 'Low' : plant.sunlight === 'medium' ? 'Medium' : 'Direct'}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <ThermometerSnowflake className="h-5 w-5 text-emerald-400/90 mb-1" />
                <span className="text-sm text-emerald-300 font-medium">{plant.temperature}</span>
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="flex justify-center mt-2 mb-2">
        <Link
          to={`/plants/${plant.id}`}
          className="inline-flex items-center justify-center bg-emerald-600/40 hover:bg-emerald-500/70 text-emerald-300 hover:text-white text-base font-medium transition-all duration-300 gap-1 py-2.5 px-7 rounded-full border border-emerald-500/40 backdrop-blur-sm shadow-sm hover:shadow-md"
        >
          <span>View more</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m9 18 6-6-6-6"/></svg>
        </Link>
      </div>
    </div>
  );
};

export default PlantCard;