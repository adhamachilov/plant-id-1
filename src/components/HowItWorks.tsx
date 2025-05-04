import React from 'react';
import FlippingCard from './FlippingCard';
import '../styles/flipCard.css';

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-emerald-950">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
          <div className="h-2 w-24 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-emerald-300 max-w-2xl mx-auto">
            Identifying plants is easy with our three simple steps. Our AI-powered technology ensures accurate results in seconds.
          </p>
        </div>

        {/* Two Column Layout - Flower Animation on Left, Cards on Right */}
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Column with Flower Animation */}
          <div className="hidden md:block md:w-3/5 flex justify-center items-start" style={{ height: '500px' }}>
            <div className="mt-[-50px] transform scale-90 w-full h-full">
              <iframe 
                src="../../../assets/flower/flower.html" 
                title="Flower Animation" 
                className="w-full h-full border-0 overflow-hidden bg-transparent rounded-2xl" 
                style={{ 
                  pointerEvents: 'none', 
                  transform: 'scale(0.95)', 
                  marginTop: '-5px',
                  borderRadius: '24px',
                  height: '500px'
                }}
                frameBorder="0"
                scrolling="no"
              />
            </div>
          </div>
          
          {/* Right Column with 3D Card */}
          <div className="w-full md:w-2/5 md:pl-6 flex items-start" style={{ marginTop: '-120px' }}>
            <FlippingCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;