import React, { ReactNode } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

interface AnimatedElementProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({ 
  children, 
  className = '', 
  delay = 0
}) => {
  const { ref, visible } = useScrollAnimation({ delay });

  return (
    <div 
      ref={ref}
      className={`transition-all duration-1000 ${className} ${
        visible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </div>
  );
};

export default AnimatedElement;