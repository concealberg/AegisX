import React, { useState, useEffect } from 'react';
import { Lock, Eye, AlertTriangle, Zap, Brain, Radar, Plane } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const BlackFilesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

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

    const section = document.getElementById('blackfiles');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const blackFiles = [
    {
      codename: 'HADES',
      title: 'Autonomous AI Swarm Drone System',
      classification: 'TOP SECRET',
      icon: Zap,
      description: 'Coordinated swarm intelligence for autonomous battlefield operations',
      details: 'Multi-agent AI system controlling synchronized drone formations with real-time tactical adaptation and target acquisition.',
      status: 'OPERATIONAL',
      color: 'from-red-600 to-red-800'
    },
    {
      codename: 'PROPHET',
      title: 'Predictive Threat Intelligence OS',
      classification: 'CLASSIFIED',
      icon: Brain,
      description: 'Neural network-based threat prediction and analysis platform',
      details: 'Advanced machine learning algorithms analyzing global intelligence data to predict and counter emerging threats before they manifest.',
      status: 'ACTIVE DEVELOPMENT',
      color: 'from-blue-600 to-blue-800'
    },
    {
      codename: 'VIGIL-X',
      title: 'Real-time Battlefield Awareness Engine',
      classification: 'SECRET',
      icon: Radar,
      description: 'Comprehensive battlefield monitoring and coordination system',
      details: 'Integrated sensor network providing 360-degree situational awareness with predictive movement analysis and threat assessment.',
      status: 'FIELD TESTING',
      color: 'from-green-600 to-green-800'
    },
    {
      codename: 'OBERON',
      title: 'Stealth VTOL Platform with AI Navigation',
      classification: 'TOP SECRET',
      icon: Plane,
      description: 'Next-generation autonomous stealth aircraft system',
      details: 'Advanced vertical takeoff/landing platform with adaptive camouflage, autonomous navigation, and deep learning flight control.',
      status: 'PROTOTYPE',
      color: 'from-purple-600 to-purple-800'
    }
  ];

  return (
    <section id="blackfiles" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Black Files
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mb-8"></div>
          <div className="flex items-center justify-center space-x-2 text-yellow-400 mb-4">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-mono text-sm">CLASSIFIED ACCESS REQUIRED</span>
            <AlertTriangle className="h-5 w-5" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {blackFiles.map((file, index) => (
            <Card
              key={file.codename}
              className={`bg-gray-900/50 backdrop-blur-sm border-2 border-red-500/30 hover:border-red-500/60 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onClick={() => setSelectedFile(selectedFile === file.codename ? null : file.codename)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${file.color} rounded-lg flex items-center justify-center transform hover:rotate-12 transition-transform duration-300`}>
                    <file.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono text-red-400 bg-red-900/30 px-2 py-1 rounded border border-red-500/30">
                      {file.classification}
                    </div>
                  </div>
                </div>
                
                <CardTitle className="text-2xl font-bold text-white mb-2 font-mono">
                  {file.codename}
                </CardTitle>
                
                <CardDescription className="text-gray-300 text-lg">
                  {file.title}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {file.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                      file.status === 'OPERATIONAL' ? 'bg-green-500' :
                      file.status === 'ACTIVE DEVELOPMENT' ? 'bg-blue-500' :
                      file.status === 'FIELD TESTING' ? 'bg-yellow-500' : 'bg-purple-500'
                    }`}></div>
                    <span className="text-xs font-mono text-gray-500">{file.status}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-red-400">
                    <Lock className="h-4 w-4" />
                    <Eye className="h-4 w-4" />
                  </div>
                </div>

                {selectedFile === file.codename && (
                  <div className="mt-4 p-4 bg-black/50 rounded-lg border border-red-500/30 animate-pulse">
                    <h4 className="font-semibold text-red-400 mb-2 font-mono">CLASSIFIED DETAILS:</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {file.details}
                    </p>
                    <div className="mt-3 text-xs font-mono text-yellow-400">
                      [ACCESS LOGGED - CLEARANCE VERIFIED]
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className={`text-center mt-16 transition-all duration-1000 delay-800 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-red-900/20 via-black to-red-900/20 p-6 rounded-lg border border-red-500/30">
            <div className="flex items-center justify-center space-x-2 text-red-400 mb-3">
              <Lock className="h-5 w-5" />
              <span className="font-mono text-sm">SECURITY NOTICE</span>
              <Lock className="h-5 w-5" />
            </div>
            <p className="text-gray-400 text-sm">
              Access to detailed project specifications requires Level-3 clearance or higher. 
              Unauthorized access attempts are monitored and logged.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlackFilesSection;