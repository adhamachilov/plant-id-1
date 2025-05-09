import React from 'react';
import { Leaf, Award, Users, Code, Zap, Clock, Star } from 'lucide-react';
import AnimatedElement from '../components/AnimatedElement';

// Add global styles for the timeline dot pulse animation
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @keyframes pulse-glow {
      0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
      70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
      100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }
    .timeline-dot {
      animation: pulse-glow 2s infinite;
    }
  `}} />
);

const AboutPage: React.FC = () => {
  const stats = [
    {
      icon: <Leaf className="h-6 w-6 text-emerald-400" />,
      value: '10,000+',
      label: 'Plant Species'
    },
    {
      icon: <Users className="h-6 w-6 text-emerald-400" />,
      value: '2M+',
      label: 'Active Users'
    },
    {
      icon: <Star className="h-6 w-6 text-emerald-400" />,
      value: '95%',
      label: 'Accuracy Rate'
    },
    {
      icon: <Clock className="h-6 w-6 text-emerald-400" />,
      value: '< 5s',
      label: 'Recognition Time'
    }
  ];

  const timeline = [
    {
      year: '2024',
      title: 'The Seed Was Planted',
      description: 'After years of exploring coding and AI, I, Adham Abdiyev, began developing a solution to a simple but common problem—identifying plants with a photo.'
    },
    {
      year: 'April 2025',
      title: 'Plant-ID Website Built',
      description: 'In just one month, I single-handedly built the Plant-ID platform—a web-based tool that uses AI to identify plants from user-uploaded images.'
    },
    {
      year: 'May 2025',
      title: 'Launched & Received First Feedback',
      description: 'Plant-ID officially launched. Early users tested the platform, praised its simplicity, and shared valuable feedback that sparked immediate improvements and database expansion.'
    },
    {
      year: 'Next Steps',
      title: 'AI Upgrades & Community Building',
      description: 'I\'m now focused on improving recognition accuracy with better AI models and building a community around the platform by connecting with gardening enthusiasts, schools, and botanical organizations worldwide.'
    }
  ];

  const team = [
    {
      name: 'Adham Abdiyev',
      role: 'Founder & CEO',
      bio: 'Self-taught Full-stack Developer with the intention of bringing real-world AI solutions to everyday users.'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Add the global styles */}
      <GlobalStyles />
      
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <AnimatedElement>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 text-center">
            About <span className="text-emerald-400">PlantID</span>
          </h1>
          <p className="text-emerald-100 text-center max-w-2xl mx-auto mb-12">
            Connecting people with nature through technology and botanical knowledge
          </p>
        </AnimatedElement>

        {/* Our Mission */}
        <AnimatedElement delay={0.2} className="mt-16">
          <div className="bg-emerald-950/50 backdrop-blur-md rounded-xl p-8 shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-2/5 flex justify-center">
                <div className="relative w-64 h-64 rounded-full bg-emerald-900/60 flex items-center justify-center">
                  <Leaf className="w-32 h-32 text-emerald-400" />
                  <div className="absolute inset-0 rounded-full border-4 border-emerald-500/30 animate-pulse"></div>
                </div>
              </div>
              <div className="md:w-3/5">
                <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                <div className="space-y-4 text-emerald-100">
                  <p>
                    At PlantID, we believe that understanding the natural world around us is the first step toward protecting it. Our mission is to help people identify, learn about, and care for plants using cutting-edge technology.
                  </p>
                  <p>
                    By making botanical knowledge accessible through artificial intelligence, we aim to foster a deeper connection between people and the plant world, promoting biodiversity awareness and conservation efforts globally.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedElement>

        {/* Stats Section */}
        <AnimatedElement delay={0.3} className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-emerald-900/30 backdrop-blur-md rounded-xl p-4 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-emerald-900/60 flex items-center justify-center mb-3">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-emerald-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimatedElement>

        {/* Our Technology */}
        <AnimatedElement delay={0.4} className="mt-16">
          <div className="bg-emerald-950/50 backdrop-blur-md rounded-xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Technology</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-5 rounded-lg bg-emerald-900/20 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-emerald-900/60 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">AI Recognition</h3>
                <p className="text-emerald-100">
                  Our advanced convolutional neural networks can identify thousands of plant species with over 95% accuracy from just a single photo.
                </p>
              </div>
              <div className="p-5 rounded-lg bg-emerald-900/20 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-emerald-900/60 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Machine Learning</h3>
                <p className="text-emerald-100">
                  Our models continuously improve through machine learning, analyzing millions of images to enhance recognition capabilities.
                </p>
              </div>
              <div className="p-5 rounded-lg bg-emerald-900/20 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-emerald-900/60 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Botanical Database</h3>
                <p className="text-emerald-100">
                  Built in collaboration with botanists, our database contains detailed information about care, growth habits, and interesting facts.
                </p>
              </div>
            </div>
          </div>
        </AnimatedElement>

        {/* Timeline */}
        <AnimatedElement delay={0.5} className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Journey</h2>
          <div className="space-y-6 relative">
            {/* Line connector */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-emerald-700/50 md:-translate-x-px"></div>
            
            {timeline.map((item, index) => (
              <div key={index} className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-4 md:gap-8 relative`}>
                {/* Dot on timeline with pulsing animation */}
                <div className="absolute left-0 md:left-1/2 top-6 w-4 h-4 rounded-full bg-emerald-500 md:-translate-x-2 timeline-dot"></div>
                
                {/* Content */}
                <div className="md:w-1/2 pl-6 md:pl-0 md:px-6">
                  <div className="bg-emerald-950/30 backdrop-blur-sm p-5 rounded-lg border-l-4 border-emerald-500">
                    <div className="text-emerald-400 font-bold mb-1">{item.year}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-emerald-100">{item.description}</p>
                  </div>
                </div>
                
                {/* Empty space for the other side */}
                <div className="md:w-1/2"></div>
              </div>
            ))}
          </div>
        </AnimatedElement>
        
        {/* Team Section */}
        <AnimatedElement delay={0.6} className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Team</h2>
          <div className="flex justify-center">
            {team.map((member, index) => (
              <div key={index} className="bg-emerald-950/30 backdrop-blur-sm rounded-xl p-6 text-center border border-emerald-800/30 max-w-sm">
                <div className="w-20 h-20 mx-auto rounded-full bg-emerald-700/30 mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-emerald-400 mb-3">{member.role}</p>
                <p className="text-emerald-100 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </AnimatedElement>
      </div>
    </div>
  );
};

export default AboutPage;
