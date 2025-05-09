import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SocialIcons from './SocialIcons';

const ContactCard: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position
    const rotateX = ((y - rect.height / 2) / rect.height) * -20;
    const rotateY = ((x - rect.width / 2) / rect.width) * 20;

    setMousePosition({ x, y });
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div 
      className="w-full rounded-3xl bg-[#1c271f] relative overflow-hidden group perspective-1000"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{ 
        duration: 0.7,
        rotateX: { duration: 0.1, ease: "linear" },
        rotateY: { duration: 0.1, ease: "linear" },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Grid Overlay */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 z-0">
        {/* Vertical lines */}
        {Array.from({ length: 13 }).map((_, i) => (
          <div 
            key={`vertical-${i}`} 
            className={`absolute left-0 right-0 h-px ${i % 3 === 0 ? 'bg-[#4a5a4f]' : 'bg-[#3a4a3f]'} ${i % 4 === 0 ? 'opacity-40' : 'opacity-20'}`} 
            style={{ top: `${(i / 12) * 100}%` }} 
          />
        ))}
        {/* Horizontal lines */}
        {Array.from({ length: 13 }).map((_, i) => (
          <div 
            key={`horizontal-${i}`} 
            className={`absolute top-0 bottom-0 w-px ${i % 3 === 0 ? 'bg-[#4a5a4f]' : 'bg-[#3a4a3f]'} ${i % 4 === 0 ? 'opacity-40' : 'opacity-20'}`}
            style={{ left: `${(i / 12) * 100}%` }} 
          />
        ))}
      </div>

      {/* Cursor Light Effect */}
      <div 
        className="pointer-events-none absolute -inset-px z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(74, 90, 79, 0.25), transparent 40%)`
        }}
      />

      {/* Accent Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#4a5a4f] rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-[#3c4c41] rounded-full opacity-15 blur-3xl" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 p-6 pb-8">
        {/* Send Button Section */}
        <motion.div 
          className="absolute top-0 left-0 right-0 flex justify-center"
          initial={{ y: -60 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, type: "spring" }}
        >
          <div className="w-48 h-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#3c4c41] to-[#4a5a4f] rounded-b-3xl opacity-90" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button 
                className="w-32 h-10 bg-gradient-to-r from-[#505a53] to-[#5a655d] rounded-full text-gray-200 font-medium text-sm transition-all shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: "#606a63" }}
                whileTap={{ scale: 0.98 }}
              >
                send
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Main Card Content - with padding to account for the send button */}
        <div className="mt-24 pt-2 flex flex-col items-center text-center">
          {/* Social Icons */}
          <SocialIcons />

          {/* Card Text */}
          <motion.div 
            className="mt-6 text-white max-w-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.7 }}
          >
            <h2 className="text-2xl font-semibold mb-3">Integrate with your favorite tools</h2>
            <p className="text-gray-300 leading-relaxed">
              Schedule, manage, and track from one dashboard saving you time and keeping your content strategy organized and efficient.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactCard;