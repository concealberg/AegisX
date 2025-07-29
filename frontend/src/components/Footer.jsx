import React, { useState, useEffect } from 'react';
import { Shield, Mail, MapPin, Terminal } from 'lucide-react';

const Footer = () => {
  const [encryptedText, setEncryptedText] = useState('AegisX Innovations | Sentinel Swarm Classified');
  const [isDecrypted, setIsDecrypted] = useState(false);

  useEffect(() => {
    const originalText = 'AegisX Innovations | Sentinel Swarm Classified';
    const encryptedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    
    const decryptAnimation = () => {
      let currentText = '';
      let decryptIndex = 0;

      const decryptInterval = setInterval(() => {
        if (decryptIndex < originalText.length) {
          // Add random characters for positions not yet decrypted
          currentText = originalText.slice(0, decryptIndex) +
            Array.from({ length: originalText.length - decryptIndex }, () => 
              encryptedChars[Math.floor(Math.random() * encryptedChars.length)]
            ).join('');
          
          setEncryptedText(currentText);
          decryptIndex++;
        } else {
          setEncryptedText(originalText);
          setIsDecrypted(true);
          clearInterval(decryptInterval);
        }
      }, 100);
    };

    const timer = setTimeout(decryptAnimation, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <footer className="bg-black border-t border-red-900/30 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="h-8 w-8 text-red-500" />
              <div>
                <span className="text-2xl font-bold text-white">AegisX</span>
                <div className="text-sm text-red-400 font-mono">INNOVATIONS</div>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Engineering the future of autonomous defense systems through synthetic cognition 
              and predictive intelligence protocols.
            </p>
            <div className="flex items-center space-x-2 text-red-400 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-mono">OPERATIONAL STATUS: ACTIVE</span>
            </div>
            <div className="flex items-center space-x-2 text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-mono">SECURITY LEVEL: MAXIMUM</span>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 font-mono">SECURE CHANNELS</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-red-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold">Headquarters</div>
                  <div className="text-gray-400 text-sm">Belfast, Northern Ireland, UK</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold">Command Channel</div>
                  <div className="text-red-400 text-sm font-mono">contact@aegisx.in</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Terminal className="h-5 w-5 text-red-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold">Secure Terminal</div>
                  <div className="text-gray-400 text-sm">Level-3 Access Required</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Access */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 font-mono">QUICK ACCESS</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-900/30 border border-red-500/20 rounded">
                <span className="text-gray-300 text-sm">Intel Briefing</span>
                <span className="text-red-400 text-xs font-mono">CLASSIFIED</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-900/30 border border-red-500/20 rounded">
                <span className="text-gray-300 text-sm">Black Operations</span>
                <span className="text-red-400 text-xs font-mono">TOP SECRET</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-900/30 border border-red-500/20 rounded">
                <span className="text-gray-300 text-sm">Recruitment Portal</span>
                <span className="text-yellow-400 text-xs font-mono">RESTRICTED</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-900/30 border border-red-500/20 rounded">
                <span className="text-gray-300 text-sm">Mission Status</span>
                <span className="text-green-400 text-xs font-mono">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Warning */}
        <div className="border-t border-red-900/30 pt-8 mb-8">
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-red-400 mb-2">
              <Terminal className="h-5 w-5" />
              <span className="font-mono text-sm font-semibold">SECURITY NOTICE</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              This site contains classified information related to defense technologies and autonomous systems. 
              Access is monitored and logged. Unauthorized attempts to access restricted areas will be reported 
              to appropriate authorities. All communications are encrypted end-to-end.
            </p>
          </div>
        </div>

        {/* Encrypted Footer */}
        <div className="border-t border-red-900/30 pt-8 text-center">
          <div className="mb-4">
            <div className={`text-lg font-mono transition-all duration-500 ${
              isDecrypted ? 'text-white' : 'text-red-400'
            }`}>
              {encryptedText}
            </div>
          </div>
          
          <div className="text-gray-500 text-sm">
            <p>© 2025 AegisX Innovations. All rights reserved.</p>
            <p className="mt-1 font-mono">
              Powered by Synthetic Cognition | Secured by Quantum Encryption
            </p>
          </div>

          {/* Classification Footer */}
          <div className="mt-6 flex items-center justify-center space-x-4 text-xs">
            <span className="bg-red-900/30 text-red-400 px-3 py-1 rounded border border-red-500/30 font-mono">
              CLASSIFIED
            </span>
            <span className="bg-yellow-900/30 text-yellow-400 px-3 py-1 rounded border border-yellow-500/30 font-mono">
              FOR OFFICIAL USE ONLY
            </span>
            <span className="bg-blue-900/30 text-blue-400 px-3 py-1 rounded border border-blue-500/30 font-mono">
              LEVEL-3 CLEARANCE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;