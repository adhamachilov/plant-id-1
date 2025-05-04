import React from 'react';
import PlantIdentifier from '../components/PlantIdentifier';

const IdentifyPage: React.FC = () => {
  return (
    <div className="bg-emerald-950 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Identify Your Plant</h1>
          <p className="text-emerald-300 max-w-2xl mx-auto">
            Take or upload a photo of any plant and our AI will identify it in seconds
          </p>
        </div>
        
        <PlantIdentifier />
      </div>
    </div>
  );
};

export default IdentifyPage;