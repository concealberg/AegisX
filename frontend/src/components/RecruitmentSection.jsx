import React, { useState, useEffect } from 'react';
import { UserPlus, Shield, AlertTriangle, Check, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { useToast } from '../hooks/use-toast';

const RecruitmentSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    ndaAgreement: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [glitchText, setGlitchText] = useState('JOIN THE INITIATIVE');
  const { toast } = useToast();

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

    const section = document.getElementById('recruitment');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const glitchChars = '!@#$%^&*()_+{}|:<>?';
    const originalText = 'JOIN THE INITIATIVE';
    let glitchCount = 0;

    const glitchInterval = setInterval(() => {
      if (glitchCount < 2) {
        const randomIndex = Math.floor(Math.random() * originalText.length);
        const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        const glitched = originalText.split('');
        glitched[randomIndex] = randomChar;
        setGlitchText(glitched.join(''));
        
        setTimeout(() => setGlitchText(originalText), 150);
        glitchCount++;
      } else {
        clearInterval(glitchInterval);
      }
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChange = (checked) => {
    setFormData({
      ...formData,
      ndaAgreement: checked
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "ACCESS DENIED",
        description: "All fields are required for clearance verification.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.ndaAgreement) {
      toast({
        title: "SECURITY BREACH",
        description: "NDA agreement is mandatory for Level-3 clearance.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Mock submission - replace with actual API call later
    setTimeout(() => {
      toast({
        title: "TRANSMISSION RECEIVED",
        description: "Your application is being processed. Clearance verification in progress.",
        variant: "default"
      });
      
      setFormData({ name: '', email: '', ndaAgreement: false });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <section id="recruitment" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Security Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(239,68,68,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239,68,68,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-center space-x-2 text-red-400 mb-4">
            <AlertTriangle className="h-6 w-6" />
            <span className="font-mono text-lg">RESTRICTED ACCESS</span>
            <AlertTriangle className="h-6 w-6" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent font-mono">
            {glitchText}
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mb-8"></div>
          
          <p className="text-gray-400 text-lg mb-2">
            Level-3 Clearance Required
          </p>
          <p className="text-red-400 text-sm font-mono">
            CLASSIFIED RECRUITMENT PROTOCOL ACTIVE
          </p>
        </div>

        <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gray-900/80 backdrop-blur-sm border-2 border-red-500/40 rounded-xl p-8 md:p-12 relative">
            {/* Scanning Lines Effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-red-500/50 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500/50 animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Security Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-2 bg-red-900/30 border border-red-500/50 rounded-full px-4 py-2">
                  <Shield className="h-5 w-5 text-red-400" />
                  <span className="font-mono text-sm text-red-400">SECURE TRANSMISSION</span>
                  <Shield className="h-5 w-5 text-red-400" />
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-mono text-gray-300 mb-2">
                    OPERATIVE NAME <span className="text-red-400">*</span>
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-black/50 border-red-500/30 text-white placeholder-gray-500 font-mono focus:border-red-500 focus:ring-red-500/20"
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono text-gray-300 mb-2">
                    SECURE CHANNEL <span className="text-red-400">*</span>
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-black/50 border-red-500/30 text-white placeholder-gray-500 font-mono focus:border-red-500 focus:ring-red-500/20"
                    placeholder="operative@classified.mil"
                    required
                  />
                </div>
              </div>

              {/* NDA Agreement */}
              <div className="p-6 bg-black/50 border border-red-500/30 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="nda"
                    checked={formData.ndaAgreement}
                    onCheckedChange={handleCheckboxChange}
                    className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                  />
                  <div className="flex-1">
                    <label htmlFor="nda" className="text-sm text-gray-300 leading-relaxed cursor-pointer">
                      I acknowledge and agree to the <span className="text-red-400 font-semibold">Non-Disclosure Agreement</span> and 
                      understand that all information accessed during this recruitment process is classified under 
                      <span className="text-red-400"> Level-3 Security Protocol</span>. Unauthorized disclosure will result in 
                      immediate termination and legal action under military jurisdiction.
                    </label>
                  </div>
                </div>
              </div>

              {/* Security Verification */}
              <div className="bg-gradient-to-r from-red-900/20 via-black to-red-900/20 p-4 rounded-lg border border-red-500/30">
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-400 font-mono">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>SECURE CONNECTION ESTABLISHED</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.ndaAgreement}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-12 py-4 text-lg font-semibold font-mono transition-all duration-300 transform hover:scale-105 border border-red-500 shadow-lg shadow-red-500/25 disabled:shadow-none disabled:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      PROCESSING...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      TRANSMIT REQUEST
                    </>
                  )}
                </Button>
              </div>

              {/* Security Notice */}
              <div className="text-center text-xs text-gray-500 font-mono">
                <p>All transmissions are encrypted and logged for security purposes</p>
                <p className="mt-1">Response time: 24-48 hours | Clearance Level: RESTRICTED</p>
              </div>
            </form>
          </div>
        </div>

        {/* Additional Security Info */}
        <div className={`mt-12 transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-gray-900/30 border border-red-500/20 rounded-lg p-4">
              <UserPlus className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <div className="text-sm text-gray-300 font-mono">ELITE RECRUITMENT</div>
              <div className="text-xs text-gray-500 mt-1">Only exceptional candidates advance</div>
            </div>
            <div className="bg-gray-900/30 border border-red-500/20 rounded-lg p-4">
              <Shield className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <div className="text-sm text-gray-300 font-mono">SECURE PROCESS</div>
              <div className="text-xs text-gray-500 mt-1">End-to-end encrypted communications</div>
            </div>
            <div className="bg-gray-900/30 border border-red-500/20 rounded-lg p-4">
              <Check className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <div className="text-sm text-gray-300 font-mono">VERIFIED ACCESS</div>
              <div className="text-xs text-gray-500 mt-1">Multi-layer clearance verification</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruitmentSection;