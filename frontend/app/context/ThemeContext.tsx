'use client'
import React, { createContext, useState, useContext, useEffect } from 'react';

// Define the structure of a team theme
export interface TeamTheme {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  backgroundColor: string;
  logo: string;
  gradient: {
    from: string;
    to: string;
  };
}
export const IPL_TEAM_THEMES: Record<string, TeamTheme> = {
  RCB: {
    name: 'Royal Challengers Bangalore',
    primaryColor: '#D12028',
    secondaryColor: '#1B1B1B',
    textColor: '#FFFFFF',
    backgroundColor: '#D1202810',
    logo: '/logos/rcb-logo.png',
    gradient: {
      from: '#D12028',
      to: '#8E0C12',
    },
  },
  MI: {
    name: 'Mumbai Indians',
    primaryColor: '#045CB5',
    secondaryColor: '#FFD700',
    textColor: '#FFFFFF',
    backgroundColor: '#045CB520',
    logo: '/logos/mumbai-logo.png',
    gradient: {
      from: '#045CB5',
      to: '#012A6D',
    },
  },
  CSK: {
    name: 'Chennai Super Kings',
    primaryColor: '#FFD600',
    secondaryColor: '#1A1A1A',
    textColor: '#1A1A1A',
    backgroundColor: '#FFD60010',
    logo: '/logos/csk-logo.png',
    gradient: {
      from: '#FFD600',
      to: '#FFC300',
    },
  },
  SRH: {
    name: 'Sunrisers Hyderabad',
    primaryColor: '#F15A24',
    secondaryColor: '#231F20',
    textColor: '#FFFFFF',
    backgroundColor: '#F15A2420',
    logo: '/logos/srh-logo.png',
    gradient: {
      from: '#F15A24',
      to: '#C7461C',
    },
  },
  RR: {
    name: 'Rajasthan Royals',
    primaryColor: '#E91E63',
    secondaryColor: '#FFFFFF',
    textColor: '#FFFFFF',
    backgroundColor: '#E91E6310',
    logo: '/logos/rr-logo.png',
    gradient: {
      from: '#E91E63',
      to: '#AD1457',
    },
  },
  KKR: {
    name: 'Kolkata Knight Riders',
    primaryColor: '#4B0082',
    secondaryColor: '#FFD700',
    textColor: '#FFFFFF',
    backgroundColor: '#4B008210',
    logo: '/logos/kkr-logo.png',
    gradient: {
      from: '#4B0082',
      to: '#301934',
    },
  },
  LSG: {
    name: 'Lucknow Super Giants',
    primaryColor: '#28A745',
    secondaryColor: '#1A1A1A',
    textColor: '#FFFFFF',
    backgroundColor: '#28A74510',
    logo: '/logos/lsg-logo.png',
    gradient: {
      from: '#28A745',
      to: '#156D34',
    },
  },
  DC: {
    name: 'Delhi Capitals',
    primaryColor: '#0047AB',
    secondaryColor: '#1A1A1A',
    textColor: '#FFFFFF',
    backgroundColor: '#0047AB10',
    logo: '/logos/dc-logo.png',
    gradient: {
      from: '#0047AB',
      to: '#002D66',
    },
  },
  PBKS: {
    name: 'Punjab Kings',
    primaryColor: '#ED1B24', // Fiery Red
    secondaryColor: '#D1C4E9', // Light Purple
    textColor: '#FFFFFF', // White
    backgroundColor: '#ED1B2410', // Transparent Red
    logo: '/logos/pbks-logo.png',
    gradient: {
      from: '#ED1B24',
      to: '#A10E15', // Deep Red
    },
  },
  GT: {
    name: 'Gujarat Titans',
    primaryColor: '#1C4D70', // Midnight Blue
    secondaryColor: '#E4B800', // Gold
    textColor: '#FFFFFF', // White
    backgroundColor: '#1C4D7010', // Transparent Blue
    logo: '/logos/gt-logo.png',
    gradient: {
      from: '#1C4D70',
      to: '#102A44', // Deep Navy
    },
  },
};
;
  
// Theme Context
interface ThemeContextType {
  theme: TeamTheme | null;
  setThemeByTeam: (team: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: null,
  setThemeByTeam: () => {}
});

// Theme Provider Component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<TeamTheme | null>(null);

  // On component mount, try to get theme from localStorage
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        if (userData.team) {
          setThemeByTeam(userData.team);
        }
      } catch (error) {
        console.error('Error parsing user data', error);
      }
    }
  }, []);

  const setThemeByTeam = (team: string) => {
    const selectedTheme = IPL_TEAM_THEMES[team];
    if (selectedTheme) {
      setTheme(selectedTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setThemeByTeam }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};