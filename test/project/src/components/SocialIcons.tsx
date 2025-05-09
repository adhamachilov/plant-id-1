import React from 'react';
import { motion } from 'framer-motion';
import { TwitterIcon, LinkedinIcon, InstagramIcon } from './Icons';

const SocialIcons: React.FC = () => {
  const iconContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const iconVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const floatingAnimation = {
    y: [-3, 3, -3],
    transition: {
      y: {
        repeat: Infinity,
        duration: 2.5,
        ease: "easeInOut",
      }
    }
  };
  
  const socialIcons = [
    { 
      id: 'twitter',
      Icon: TwitterIcon,
      delay: 0
    },
    { 
      id: 'linkedin',
      Icon: LinkedinIcon,
      delay: 0.1
    },
    { 
      id: 'instagram',
      Icon: InstagramIcon,
      delay: 0.2
    }
  ];

  return (
    <motion.div
      className="flex justify-center space-x-8 py-2"
      variants={iconContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {socialIcons.map(({ id, Icon, delay }) => (
        <motion.div
          key={id}
          className="group"
          variants={iconVariants}
          whileHover={{ scale: 1.1 }}
          animate={floatingAnimation}
          custom={delay}
        >
          <div className="w-16 h-16 rounded-full bg-[#252F29] flex items-center justify-center shadow-lg group-hover:bg-[#303A34] transition-colors duration-300">
            <Icon className="w-8 h-8 text-white" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SocialIcons;