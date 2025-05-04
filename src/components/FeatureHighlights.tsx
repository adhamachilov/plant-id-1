import React from 'react';
import { BookOpen, Droplets, Sun, Compass, Thermometer } from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="h-10 w-10 text-emerald-500" />,
    title: 'Detailed Information',
    description: 'Get comprehensive data about any plant, including scientific name, common names, and family.'
  },
  {
    icon: <Droplets className="h-10 w-10 text-emerald-500" />,
    title: 'Care Instructions',
    description: 'Learn exactly how to care for your plant with watering, light, and soil recommendations.'
  },
  {
    icon: <Sun className="h-10 w-10 text-emerald-500" />,
    title: 'Growth Conditions',
    description: 'Understand optimal growing conditions including light requirements and humidity levels.'
  },
  {
    icon: <Compass className="h-10 w-10 text-emerald-500" />,
    title: 'Native Habitat',
    description: 'Discover where your plant originates from and its natural growing environment.'
  },
  {
    icon: <Thermometer className="h-10 w-10 text-emerald-500" />,
    title: 'Fun Facts',
    description: 'Impress your friends with interesting trivia and unique facts about your plants.'
  }
];

const FeatureHighlights: React.FC = () => {
  return (
    <section className="py-16 bg-emerald-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything You Need to Know</h2>
          <p className="text-emerald-300 max-w-2xl mx-auto">
            Our AI-powered plant identification gives you more than just a name. 
            Get complete insights about your plants with a single photo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-emerald-900/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-800/50 hover:border-emerald-700/70 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-1"
            >
              <div className="mb-4 bg-emerald-950/50 p-4 inline-block rounded-xl">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-emerald-200">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;