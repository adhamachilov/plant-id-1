import React from 'react';
import { TwitterIcon, LinkedinIcon, InstagramIcon, EmailIcon } from './ContactIcons';

const SocialIcons: React.FC = () => {
  // Social icons are staggered by their index
  
  const socialIcons = [
    { 
      id: 'twitter',
      Icon: TwitterIcon,
      delay: 0,
      href: 'https://twitter.com/plantid'
    },
    { 
      id: 'linkedin',
      Icon: LinkedinIcon,
      delay: 0.1,
      href: 'https://linkedin.com/company/plantid'
    },
    { 
      id: 'instagram',
      Icon: InstagramIcon,
      delay: 0.2,
      href: 'https://instagram.com/plantid'
    },
    { 
      id: 'email',
      Icon: EmailIcon,
      delay: 0.3,
      href: 'mailto:adhamachilovusa@gmail.com'
    }
  ];

  return (
    <div
      className="flex justify-center space-x-6 py-2 opacity-0 animate-fadeIn"
      style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
    >
      {socialIcons.map(({ id, Icon, delay, href }) => (
        <a
          key={id}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group opacity-0 animate-fadeIn hover:scale-110 transition-transform animate-float"
          style={{ 
            animationDelay: `${0.8 + (delay * 0.2)}s`, 
            animationFillMode: 'forwards',
            transformOrigin: 'center'
          }}
        >
          <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg group-hover:bg-emerald-500 transition-colors duration-300 ring-1 ring-emerald-400/30">
            <Icon className="w-8 h-8 text-white" />
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
