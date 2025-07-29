import React, { useState, useEffect } from 'react';
import { Brain, Cpu, Satellite, Target } from 'lucide-react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('about');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const capabilities = [
    {
      icon: Brain,
      title: 'Neural Defense Frameworks',
      description: 'AI-powered threat prediction and autonomous response systems'
    },
    {
      icon: Satellite,
      title: 'Autonomous Aerial Systems',
      description: 'Next-generation unmanned surveillance and tactical platforms'
    },
    {
      icon: Target,
      title: 'Precision Intelligence',
      description: 'Real-time battlefield awareness and strategic coordination'
    },
    {
      icon: Cpu,
      title: 'Synthetic Cognition',
      description: 'Advanced machine learning for tactical decision making'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Who We Are
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-blue-600/20 rounded-lg blur-xl"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-red-500/30 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Mission Intel</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  <span className="text-red-400 font-semibold">AegisX Innovations</span> operates at the intersection of 
                  military intelligence, autonomous systems, and synthetic cognition. We develop classified defense technologies 
                  that prepare nations for tomorrow's warfare.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Our core focus: <span className="text-red-400">AI-based autonomous systems</span>, neural defense frameworks, 
                  and next-generation aerospace solutions that operate beyond conventional limitations.
                </p>
                
                <div className="mt-8 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-400 font-mono">CLEARANCE LEVEL: CLASSIFIED</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-400 font-mono">OPERATIONAL STATUS: ACTIVE</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-400 font-mono">THREAT LEVEL: MAXIMUM READINESS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="space-y-6">
              {capabilities.map((capability, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-gray-900/30 backdrop-blur-sm border border-red-500/20 hover:border-red-500/40 transition-all duration-300 group"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <capability.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">{capability.title}</h4>
                    <p className="text-gray-400 text-sm">{capability.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`text-center transition-all duration-1000 delay-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 p-8 rounded-lg border border-red-500/30">
            <blockquote className="text-xl md:text-2xl text-gray-300 font-mono italic mb-4">
              "Not all wars are fought with weapons. Some are fought with code, cognition, and foresight."
            </blockquote>
            <div className="text-red-400 font-semibold">— AegisX Intelligence Division</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;