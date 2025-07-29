// Mock data for AegisX Innovations website
// This will be replaced with actual backend API calls later

export const mockRecruitmentData = {
  // Mock data for recruitment submissions
  submissions: [
    {
      id: 1,
      name: 'John Operative',
      email: 'j.operative@classified.mil',
      ndaAgreement: true,
      submittedAt: '2025-01-13T10:30:00Z',
      status: 'pending'
    }
  ]
};

export const mockMissionStats = {
  sentinelRodsDeployed: 2847,
  borderKilometersSecured: 15106,
  autonomousSwapsPerDay: 3240,
  threatPredictionsPerHour: 847,
  lastUpdated: '2025-01-13T12:00:00Z'
};

export const mockBlackFiles = [
  {
    codename: 'HADES',
    title: 'Autonomous AI Swarm Drone System',
    classification: 'TOP SECRET',
    description: 'Coordinated swarm intelligence for autonomous battlefield operations',
    details: 'Multi-agent AI system controlling synchronized drone formations with real-time tactical adaptation and target acquisition.',
    status: 'OPERATIONAL',
    color: 'from-red-600 to-red-800'
  },
  {
    codename: 'PROPHET',
    title: 'Predictive Threat Intelligence OS',
    classification: 'CLASSIFIED',
    description: 'Neural network-based threat prediction and analysis platform',
    details: 'Advanced machine learning algorithms analyzing global intelligence data to predict and counter emerging threats before they manifest.',
    status: 'ACTIVE DEVELOPMENT',
    color: 'from-blue-600 to-blue-800'
  },
  {
    codename: 'VIGIL-X',
    title: 'Real-time Battlefield Awareness Engine',
    classification: 'SECRET',
    description: 'Comprehensive battlefield monitoring and coordination system',
    details: 'Integrated sensor network providing 360-degree situational awareness with predictive movement analysis and threat assessment.',
    status: 'FIELD TESTING',
    color: 'from-green-600 to-green-800'
  },
  {
    codename: 'OBERON',
    title: 'Stealth VTOL Platform with AI Navigation',
    classification: 'TOP SECRET',
    description: 'Next-generation autonomous stealth aircraft system',
    details: 'Advanced vertical takeoff/landing platform with adaptive camouflage, autonomous navigation, and deep learning flight control.',
    status: 'PROTOTYPE',
    color: 'from-purple-600 to-purple-800'
  }
];

export const mockFounderInfo = {
  name: 'Akhilesh Sahu',
  title: 'Founder & CEO',
  clearanceLevel: 'LEVEL-5 ALPHA',
  operationStatus: 'ACTIVE COMMAND',
  location: 'Belfast, Northern Ireland',
  message: "I founded AegisX not just to innovate — but to prepare. When conventional warfare fails, when traditional defense crumbles, intelligence takes over. We're not building weapons; we're architecting the cognitive superiority that wins wars before they begin."
};

export const mockCompanyInfo = {
  name: 'AegisX Innovations',
  tagline: 'Engineering the Future of Warfare & Intelligence',
  mission: 'Defense. Autonomy. Supremacy.',
  description: 'AegisX Innovations operates at the intersection of military intelligence, autonomous systems, and synthetic cognition. We develop classified defense technologies that prepare nations for tomorrow\'s warfare.',
  headquarters: 'Belfast, Northern Ireland, UK',
  email: 'contact@aegisx.in',
  operationalStatus: 'ACTIVE',
  securityLevel: 'MAXIMUM',
  clearanceRequired: 'LEVEL-3'
};

// Mock API functions (to be replaced with actual API calls)
export const mockAPI = {
  // Submit recruitment application
  submitRecruitment: async (applicationData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Application submitted successfully',
          applicationId: Date.now(),
          status: 'pending_review'
        });
      }, 2000);
    });
  },

  // Get mission statistics
  getMissionStats: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockMissionStats);
      }, 1000);
    });
  },

  // Get black files data
  getBlackFiles: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockBlackFiles);
      }, 500);
    });
  },

  // Get founder information
  getFounderInfo: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockFounderInfo);
      }, 300);
    });
  },

  // Get company information
  getCompanyInfo: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockCompanyInfo);
      }, 200);
    });
  }
};