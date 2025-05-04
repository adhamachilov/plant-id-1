import React, { useState } from 'react';
import { Camera, Search, Leaf, ChevronRight, ChevronLeft } from 'lucide-react';

interface CardContent {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const FlippingCard: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  
  const cards: CardContent[] = [
    {
      icon: <Camera className="h-10 w-10 text-white" />,
      title: 'Take a Photo',
      description: 'Use your camera to snap a clear photo of any plant you want to identify.',
      color: 'from-emerald-600 to-emerald-500'
    },
    {
      icon: <Search className="h-10 w-10 text-white" />,
      title: 'AI Analysis',
      description: 'Our advanced AI analyzes the image, comparing it with our database of thousands of plant species.',
      color: 'from-emerald-700 to-emerald-600'
    },
    {
      icon: <Leaf className="h-10 w-10 text-white" />,
      title: 'Get Results',
      description: 'Receive detailed information about your plant, including care tips and fun facts.',
      color: 'from-emerald-800 to-emerald-700'
    }
  ];

  const nextCard = () => {
    if (activeIndex < cards.length - 1 && !isFlipping) {
      setIsFlipping(true);
      
      // Wait until halfway through the flip to hide content and change card
      setTimeout(() => {
        setContentVisible(false);
        setActiveIndex(prev => prev + 1);
      }, 150);
      
      // Show content after flip is complete
      setTimeout(() => {
        setContentVisible(true);
        setIsFlipping(false);
      }, 400);
    }
  };

  const prevCard = () => {
    if (activeIndex > 0 && !isFlipping) {
      setIsFlipping(true);
      
      // Wait until halfway through the flip to hide content and change card
      setTimeout(() => {
        setContentVisible(false);
        setActiveIndex(prev => prev - 1);
      }, 150);
      
      // Show content after flip is complete
      setTimeout(() => {
        setContentVisible(true);
        setIsFlipping(false);
      }, 400);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-6">
      <div className="w-full max-w-sm mx-auto">
        <div className="flip-card mb-6">
          <div className={`flip-card-inner ${isFlipping ? 'flipping' : ''}`}>
            <div className={`flip-card-front p-6 bg-gradient-to-r ${cards[activeIndex].color}`}>
              <div className={`flex flex-col items-center text-center ${contentVisible ? 'card-content-fade-in' : 'opacity-0'}`}>
                <div className="mb-4 bg-white/20 p-4 rounded-full card-icon">
                  {cards[activeIndex].icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 card-title">{cards[activeIndex].title}</h3>
                <p className="text-white/90 mb-6 text-base card-description">{cards[activeIndex].description}</p>
                
                <div className="flex justify-between w-full px-2 card-buttons">
                  {activeIndex > 0 && (
                    <button 
                      onClick={prevCard}
                      disabled={isFlipping}
                      className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-300 focus:outline-none disabled:opacity-50"
                      aria-label="Previous Card"
                    >
                      <ChevronLeft className="h-5 w-5 text-white" />
                    </button>
                  )}
                  
                  <div className="flex-1" />
                  
                  {activeIndex < cards.length - 1 && (
                    <button 
                      onClick={nextCard}
                      disabled={isFlipping}
                      className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-300 focus:outline-none disabled:opacity-50"
                      aria-label="Next Card"
                    >
                      <ChevronRight className="h-5 w-5 text-white" />
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            <div className={`flip-card-back p-6 bg-gradient-to-r ${cards[activeIndex].color}`}>
              <div className={`flex flex-col items-center text-center ${contentVisible ? 'card-content-fade-in' : 'opacity-0'}`}>
                <div className="mb-4 bg-white/20 p-4 rounded-full card-icon">
                  {cards[activeIndex].icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 card-title">{cards[activeIndex].title}</h3>
                <p className="text-white/90 mb-6 text-base card-description">{cards[activeIndex].description}</p>
                
                <div className="flex justify-between w-full px-2 card-buttons">
                  {activeIndex > 0 && (
                    <button 
                      onClick={prevCard}
                      disabled={isFlipping}
                      className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-300 focus:outline-none disabled:opacity-50"
                      aria-label="Previous Card"
                    >
                      <ChevronLeft className="h-5 w-5 text-white" />
                    </button>
                  )}
                  
                  <div className="flex-1" />
                  
                  {activeIndex < cards.length - 1 && (
                    <button 
                      onClick={nextCard}
                      disabled={isFlipping}
                      className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-300 focus:outline-none disabled:opacity-50"
                      aria-label="Next Card"
                    >
                      <ChevronRight className="h-5 w-5 text-white" />
                    </button>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
        
        {/* Card indicator dots */}
        <div className="flex justify-center space-x-2 mt-3">
          {cards.map((_, index) => (
            <div 
              key={index} 
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'w-6 bg-emerald-400' : 'w-2 bg-emerald-800/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlippingCard;
