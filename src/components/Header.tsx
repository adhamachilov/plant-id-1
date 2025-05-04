import React, { useState } from 'react';
import { Leaf, Search, Menu, X, Camera, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-white hover:text-emerald-400 transition-colors duration-300"
        >
          <Leaf className="h-6 w-6 text-emerald-400" />
          <span className="text-xl font-semibold tracking-tight">PlantID</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="flex-1 flex justify-center">
          <div className="px-8 py-3 rounded-full bg-emerald-900/80 backdrop-blur-md hidden md:block">
            <nav className="flex items-center space-x-8">
              <Link to="/" className="text-white hover:text-emerald-400 transition-colors duration-300">Home</Link>
              <Link to="/identify" className="text-white hover:text-emerald-400 transition-colors duration-300">Identify</Link>
              <Link to="/plants" className="text-white hover:text-emerald-400 transition-colors duration-300">Plants</Link>
              <Link to="/about" className="text-white hover:text-emerald-400 transition-colors duration-300">About</Link>
            </nav>
          </div>
        </div>

        {/* Desktop Search and Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 rounded-full text-white hover:bg-emerald-800/50 transition-colors duration-300"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link 
            to="/identify" 
            className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-emerald-950 font-medium px-4 py-2 rounded-full transition-colors duration-300"
          >
            <Camera className="h-4 w-4" />
            <span>Identify</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-full text-white hover:bg-emerald-800/50 transition-colors duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-emerald-950 animate-fadeIn">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-white py-2 hover:text-emerald-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/identify" 
              className="text-white py-2 hover:text-emerald-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Identify
            </Link>
            <Link 
              to="/plants" 
              className="text-white py-2 hover:text-emerald-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Plants
            </Link>
            <Link 
              to="/about" 
              className="text-white py-2 hover:text-emerald-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-2 border-t border-emerald-800/50">
              <Link
                to="/identify"
                className="flex items-center justify-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-emerald-950 font-medium px-4 py-3 rounded-full transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <Camera className="h-4 w-4" />
                <span>Identify Plant</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar (Expandable) */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 p-4 animate-slideDown">
          <div className="container mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-600 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for plants..."
                className="w-full bg-emerald-900/50 border border-emerald-800 text-white rounded-full py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                autoFocus
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;