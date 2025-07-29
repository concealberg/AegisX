import React, { useState, useEffect } from 'react';
import { MapPin, Zap, RotateCcw, Activity } from 'lucide-react';

const MissionSection = () => {
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

    const section = document.getElementById('mission');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const missionStats = [
    { label: 'Sentinel Rods Deployed', value: '2,847', icon: MapPin, color: 'text-red-400' },
    { label: 'Border Kilometers Secured', value: '15,106', icon: Activity, color: 'text-blue-400' },
    { label: 'Autonomous Swaps/Day', value: '3,240', icon: RotateCcw, color: 'text-green-400' },
    { label: 'Threat Predictions/Hour', value: '847', icon: Zap, color: 'text-yellow-400' }
  ];

  return (
    <section id="mission" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Border Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            The Mission
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mb-8"></div>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Sentinel Swarm Protocol: Autonomous border defense through distributed intelligence
          </p>
        </div>

        {/* Main Mission Visual */}
        <div className={`mb-16 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-xl border border-red-500/30 p-8 md:p-12">
            {/* Desert Night Scene Representation */}
            <div className="relative h-64 md:h-80 bg-gradient-to-b from-gray-800 to-black rounded-lg mb-8 overflow-hidden">
              {/* Stars Background */}
              <div className="absolute inset-0">
                {Array.from({ length: 50 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-px h-px bg-white animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                    }}
                  ></div>
                ))}
              </div>

              {/* Border Line */}
              <div className="absolute bottom-16 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-red-400 to-red-500 animate-pulse"></div>

              {/* Sentinel Rods */}
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute bottom-14"
                  style={{ left: `${12 + i * 10}%` }}
                >
                  <div className="w-2 h-8 bg-gradient-to-t from-red-600 to-red-400 rounded-sm shadow-lg shadow-red-500/50">
                    {/* Rod Top Light */}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-400 rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* Drone Trails */}
                  <div 
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-px h-4 bg-blue-400 opacity-60 animate-pulse"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  ></div>
                </div>
              ))}

              {/* Patrolling Drones */}
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${40 + Math.sin(Date.now() / 1000 + i) * 10}%`,
                    animation: `patrol 4s ease-in-out infinite`,
                    animationDelay: `${i * 1.3}s`
                  }}
                >
                  <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping"></div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Sentinel Swarm Deployment
              </h3>
              <p className="text-gray-300 leading-relaxed max-w-4xl mx-auto">
                Every kilometer of critical border infrastructure protected by autonomous Sentinel Rods. 
                <span className="text-red-400"> AI-powered drones</span> patrol continuously, while 
                <span className="text-blue-400"> autonomous battery-swap robots</span> ensure 24/7 operational readiness. 
                When traditional surveillance fails, <span className="text-red-400">synthetic cognition prevails</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Statistics */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {missionStats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-gray-900/50 backdrop-blur-sm border border-red-500/30 rounded-lg p-6 text-center hover:border-red-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-3`} />
              <div className={`text-2xl md:text-3xl font-bold ${stat.color} mb-2 font-mono`}>
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm font-mono">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className={`text-center transition-all duration-1000 delay-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-red-900/20 via-black to-red-900/20 p-8 rounded-xl border border-red-500/30">
            <blockquote className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed mb-6 italic">
              "Not all wars are fought with weapons. Some are fought with code, cognition, and foresight."
            </blockquote>
            <div className="text-red-400 font-semibold font-mono">— AegisX Mission Protocol</div>
            <div className="mt-4 text-sm text-gray-500 font-mono">
              OPERATIONAL SINCE 2024 | THREAT LEVEL: MAXIMUM READINESS
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes patrol {
          0%, 100% { transform: translateX(-20px); }
          50% { transform: translateX(20px); }
        }
      `}</style>
    </section>
  );
};

export default MissionSection;