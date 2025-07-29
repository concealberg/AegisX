import React, { useState, useEffect } from 'react';
import { Shield, Quote } from 'lucide-react';

const FounderSection = () => {
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

    const section = document.getElementById('founder');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="founder" className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Command Structure
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mb-8"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className={`relative transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Hologram Effect Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-blue-600/10 to-red-600/10 rounded-xl blur-xl"></div>
            
            <div className="relative bg-gray-900/80 backdrop-blur-sm border border-red-500/40 rounded-xl p-8 md:p-12">
              {/* Top Classification Bar */}
              <div className="flex items-center justify-center mb-8">
                <div className="bg-red-900/30 border border-red-500/50 rounded-full px-4 py-2">
                  <div className="flex items-center space-x-2 text-red-400">
                    <Shield className="h-4 w-4" />
                    <span className="font-mono text-sm">COMMAND CLEARANCE</span>
                    <Shield className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Founder Profile */}
              <div className="text-center mb-12">
                <div className="relative inline-block mb-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-red-700 rounded-full mx-auto flex items-center justify-center border-4 border-red-400/50">
                    <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">AS</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 border-2 border-red-500/30 rounded-full animate-pulse"></div>
                  <div className="absolute -inset-2 border border-red-400/20 rounded-full animate-spin-slow"></div>
                </div>

                <h3 className="text-3xl font-bold text-white mb-2">Akhilesh Sahu</h3>
                <div className="text-red-400 font-mono text-lg mb-8">FOUNDER & CEO</div>
                
                <div className="bg-black/50 border border-red-500/30 rounded-lg p-6 mb-8">
                  <div className="text-xs font-mono text-gray-500 mb-3">CLASSIFIED CREDENTIALS:</div>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Security Clearance:</span>
                      <span className="text-red-400">LEVEL-5 ALPHA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Operation Status:</span>
                      <span className="text-green-400">ACTIVE COMMAND</span>
                    </div>
                    <div className="flex justify-between">
                      <span>HQ Location:</span>
                      <span className="text-blue-400">Belfast, Northern Ireland</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Founder's Message */}
              <div className="relative">
                <Quote className="absolute -top-4 -left-4 h-12 w-12 text-red-500/30" />
                <blockquote className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed mb-8 pl-8">
                  "I founded AegisX not just to innovate — but to prepare. When conventional warfare fails, 
                  when traditional defense crumbles, <span className="text-red-400 font-semibold">intelligence takes over</span>. 
                  We're not building weapons; we're architecting the cognitive superiority that wins wars before they begin."
                </blockquote>
                <Quote className="absolute -bottom-4 -right-4 h-12 w-12 text-red-500/30 transform rotate-180" />
              </div>

              <div className="text-right">
                <div className="text-red-400 font-semibold text-lg">— Akhilesh Sahu</div>
                <div className="text-gray-500 font-mono text-sm">Founder & Chief Executive Officer</div>
                <div className="text-gray-500 font-mono text-sm">AegisX Innovations</div>
              </div>

              {/* Mission Statement */}
              <div className="mt-12 p-6 bg-gradient-to-r from-red-900/20 via-black to-red-900/20 rounded-lg border border-red-500/30">
                <h4 className="text-lg font-semibold text-red-400 mb-3 font-mono">OPERATIONAL DIRECTIVE:</h4>
                <p className="text-gray-300 leading-relaxed">
                  Under Sahu's leadership, AegisX operates with a singular focus: developing autonomous defense technologies 
                  that transcend conventional military limitations. Our mission extends beyond traditional warfare into the 
                  realm of <span className="text-red-400">predictive intelligence</span> and <span className="text-red-400">autonomous decision-making systems</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default FounderSection;