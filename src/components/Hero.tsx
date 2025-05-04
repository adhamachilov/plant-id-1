import React from 'react';
import { Camera, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Make sure 3D model is copied to public folder
const CopyBeeModel = () => {
  // This is just a client-side reminder - the actual copying should be done
  // by your build process or manually
  console.log('Remember to ensure bee model is in public/3d/ folder');
  
  return null;
};

const Hero: React.FC = () => {
  return (
    <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-emerald-950 z-0">
      </div>

      {/* Reminder to copy 3D model */}
      <CopyBeeModel />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-14">
          {/* Hero Text */}
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-fadeIn">
              Identify Any Plant <span className="text-emerald-400">Instantly</span>
            </h1>
            <p className="text-lg md:text-xl text-emerald-100 mb-8 max-w-md animate-fadeIn animation-delay-200">
              Take a photo of any plant and our AI will identify it in seconds. Get detailed information, care tips, and interesting facts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn animation-delay-400">
              <Link
                to="/identify"
                className="flex items-center justify-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-emerald-950 px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-emerald-500/30"
              >
                <Camera className="h-5 w-5" />
                <span>Identify Now</span>
              </Link>
              <Link
                to="/plants"
                className="flex items-center justify-center space-x-2 bg-transparent border border-emerald-500 hover:bg-emerald-950 text-emerald-400 px-6 py-3 rounded-full font-medium transition-all duration-300"
              >
                <span>Browse Plants</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          {/* 3D Bee Model without container */}
          <div className="relative" style={{ height: "600px", overflow: "hidden" }}>
            <iframe 
              src="/transparent-bee.html" 
              title="3D Bee Model"
              className="md:block hidden absolute"
              style={{
                width: "120%", /* Increased from 100% to 120% */
                height: "850px", /* Increased from 750px to 850px */
                border: "none",
                background: "transparent",
                pointerEvents: "auto",
                top: "-250px", /* Extends 250px upward (increased from 150px) */
                left: "-20%" /* Shifts 20% to the left */
              }}
              frameBorder="0"
              scrolling="no"
              allowTransparency={true}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;