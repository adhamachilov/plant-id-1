import React from 'react';

// Simple component to generate avatar placeholder with initials
const Avatar: React.FC<{name: string, className?: string}> = ({ name, className = "" }) => {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <div 
      className={`flex items-center justify-center bg-emerald-600 text-white font-medium ${className}`}
      style={{ 
        backgroundColor: `hsl(${Math.abs(name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 360}, 70%, 40%)` 
      }}
    >
      {initials}
    </div>
  );
};

export default Avatar;
