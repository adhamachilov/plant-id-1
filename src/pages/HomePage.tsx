import React from 'react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import FeatureHighlights from '../components/FeatureHighlights';
import PlantGrid from '../components/PlantGrid';
import { getFeaturedPlants } from '../services/plantService';

const HomePage: React.FC = () => {
  const popularPlants = getFeaturedPlants(4);

  return (
    <div className="bg-emerald-950 min-h-screen">
      <Hero />
      
      <div className="py-16">
        <PlantGrid 
          plants={popularPlants} 
          title="Popular Plants"
          description="Our community's favorite plants to grow at home"
        />
      </div>
      
      <HowItWorks />
      
      <FeatureHighlights />
    </div>
  );
};

export default HomePage;