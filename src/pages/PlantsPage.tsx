import React, { useState } from 'react';
import { Search } from 'lucide-react';
import PlantGrid from '../components/PlantGrid';
import { getAllPlants, searchPlants } from '../services/plantService';

const PlantsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const allPlants = getAllPlants();
  
  const filteredPlants = searchTerm 
    ? searchPlants(searchTerm)
    : allPlants;

  return (
    <div className="bg-emerald-950 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Plant Database</h1>
          <p className="text-emerald-300 max-w-2xl mx-auto mb-8">
            Browse our comprehensive database of plants
          </p>
          
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-600 h-5 w-5" />
            <input
              type="text"
              placeholder="Search plants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-emerald-900/50 border border-emerald-800 text-white rounded-full py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
        
        {filteredPlants.length > 0 ? (
          <PlantGrid plants={filteredPlants} />
        ) : (
          <div className="text-center py-16">
            <p className="text-emerald-400 text-lg">No plants found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantsPage;