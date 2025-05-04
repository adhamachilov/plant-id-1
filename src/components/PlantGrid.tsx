import React from 'react';
import PlantCard, { PlantInfo } from './PlantCard';

interface PlantGridProps {
  plants: PlantInfo[];
  title?: string;
  description?: string;
  featured?: boolean;
}

const PlantGrid: React.FC<PlantGridProps> = ({ 
  plants, 
  title, 
  description,
  featured = false
}) => {
  return (
    <section className="py-12 pt-20">
      <div className="container mx-auto px-4">
        {(title || description) && (
          <div className="text-center mb-32">
            {title && <h2 className="text-3xl font-bold text-white mb-3">{title}</h2>}
            {description && <p className="text-emerald-300 max-w-2xl mx-auto">{description}</p>}
          </div>
        )}

        <div className="flex justify-center flex-row gap-6 px-6 mx-auto mt-24">
          {plants.map((plant) => (
            <PlantCard 
              key={plant.id} 
              plant={plant}
              featured={featured}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlantGrid;