import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import BlackFilesSection from './BlackFilesSection';
import FounderSection from './FounderSection';
import MissionSection from './MissionSection';
import RecruitmentSection from './RecruitmentSection';
import Footer from './Footer';

const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen bg-black text-white transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <BlackFilesSection />
      <FounderSection />
      <MissionSection />
      <RecruitmentSection />
      <Footer />
    </div>
  );
};

export default LandingPage;