import React, { useState, useEffect } from 'react';
import { ChevronDown, Globe, Zap } from 'lucide-react';
import { Button } from './ui/button';

const HeroSection = () => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [glitchText, setGlitchText] = useState('Engineering the Future of Warfare & Intelligence');

  useEffect(() => {
    const timer = setTimeout(() => setAnimationPhase(1), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const glitchChars = '!@#$%^&*()_+{}|:<>?';
    const originalText = 'Engineering the Future of Warfare & Intelligence';
    let glitchCount = 0;

    const glitchInterval = setInterval(() => {
      if (glitchCount < 3) {
        const randomIndex = Math.floor(Math.random() * originalText.length);
        const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        const glitched = originalText.split('');
        glitched[randomIndex] = randomChar;
        setGlitchText(glitched.join(''));
        
        setTimeout(() => setGlitchText(originalText), 100);
        glitchCount++;
      } else {
        clearInterval(glitchInterval);
      }
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Animated Background Grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-full bg-red-500/30"
              style={{ 
                left: `${i * 5}%`,
                animationDelay: `${i * 0.1}s`,
                animation: 'pulse 2s ease-in-out infinite'
              }}
            ></div>
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-px bg-red-500/30"
              style={{ 
                top: `${i * 5}%`,
                animationDelay: `${i * 0.1}s`,
                animation: 'pulse 2s ease-in-out infinite'
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* 3D Globe Effect */}
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 border border-red-500/50 rounded-full animate-spin-slow"></div>
          <div className="absolute inset-4 border border-blue-500/50 rounded-full animate-spin-reverse"></div>
          <div className="absolute inset-8 border border-red-400/30 rounded-full animate-pulse"></div>
          <Globe className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 text-red-500 animate-pulse" />
          
          {/* Orbiting Dots (representing drones) */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-red-500 rounded-full"
              style={{
                animation: `orbit 4s linear infinite`,
                animationDelay: `${i * 0.5}s`,
                transformOrigin: '128px 128px',
                left: '50%',
                top: '50%',
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className={`transition-all duration-1000 transform ${animationPhase >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-red-100 to-red-200 bg-clip-text text-transparent">
            {glitchText}
          </h1>
          
          <div className="text-xl md:text-2xl mb-8 font-mono tracking-wider">
            <span className="text-red-400">Defense.</span>
            <span className="text-white mx-4">Autonomy.</span>
            <span className="text-red-400">Supremacy.</span>
          </div>

          <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Classified military intelligence meets autonomous warfare systems. Where conventional tactics fail, 
            <span className="text-red-400"> synthetic cognition</span> takes command.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => scrollToSection('recruitment')}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 border border-red-500 shadow-lg shadow-red-500/25"
            >
              <Zap className="mr-2 h-5 w-5" />
              JOIN THE MISSION
            </Button>
            
            <Button 
              onClick={() => scrollToSection('blackfiles')}
              variant="outline"
              className="border-red-500/50 text-red-400 hover:bg-red-500/10 px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              ACCESS BLACK FILES
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-red-400" />
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;