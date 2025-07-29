import React, { useState } from 'react';
import { Menu, X, Shield } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-red-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-red-500" />
            <span className="text-xl font-bold text-white">AegisX</span>
            <span className="text-sm text-red-400 font-mono">INNOVATIONS</span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-red-400 transition-colors px-3 py-2 text-sm font-medium">
                Intel
              </button>
              <button onClick={() => scrollToSection('blackfiles')} className="text-gray-300 hover:text-red-400 transition-colors px-3 py-2 text-sm font-medium">
                Black Files
              </button>
              <button onClick={() => scrollToSection('founder')} className="text-gray-300 hover:text-red-400 transition-colors px-3 py-2 text-sm font-medium">
                Command
              </button>
              <button onClick={() => scrollToSection('mission')} className="text-gray-300 hover:text-red-400 transition-colors px-3 py-2 text-sm font-medium">
                Mission
              </button>
              <button onClick={() => scrollToSection('recruitment')} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm font-medium transition-all duration-300 border border-red-500">
                JOIN INITIATIVE
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-red-400 block px-3 py-2 text-base font-medium w-full text-left">
              Intel
            </button>
            <button onClick={() => scrollToSection('blackfiles')} className="text-gray-300 hover:text-red-400 block px-3 py-2 text-base font-medium w-full text-left">
              Black Files
            </button>
            <button onClick={() => scrollToSection('founder')} className="text-gray-300 hover:text-red-400 block px-3 py-2 text-base font-medium w-full text-left">
              Command
            </button>
            <button onClick={() => scrollToSection('mission')} className="text-gray-300 hover:text-red-400 block px-3 py-2 text-base font-medium w-full text-left">
              Mission
            </button>
            <button onClick={() => scrollToSection('recruitment')} className="bg-red-600 hover:bg-red-700 text-white block px-3 py-2 text-base font-medium w-full text-left">
              JOIN INITIATIVE
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;