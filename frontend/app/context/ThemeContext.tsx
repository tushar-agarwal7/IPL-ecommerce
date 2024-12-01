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
      primaryColor: '#D12028', // Bright Red
      secondaryColor: '#1B1B1B', // Deep Black
      textColor: '#FFFFFF', // White for contrast
      backgroundColor: '#D1202810', // Transparent Red
      logo: '/logos/rcb-logo.png',
      gradient: {
        from: '#D12028',
        to: '#8E0C12', // Deep Crimson
      },
    },
    MI: {
      name: 'Mumbai Indians',
      primaryColor: '#045CB5', // Royal Blue
      secondaryColor: '#FFD700', // Gold
      textColor: '#FFFFFF', // White
      backgroundColor: '#045CB520', // Transparent Blue
      logo: '/logos/mumbai-logo.png',
      gradient: {
        from: '#045CB5',
        to: '#012A6D', // Dark Navy
      },
    },
    CSK: {
      name: 'Chennai Super Kings',
      primaryColor: '#FFD600', // Bright Yellow
      secondaryColor: '#1A1A1A', // Dark Black
      textColor: '#1A1A1A', // Black for contrast
      backgroundColor: '#FFD60010', // Transparent Yellow
      logo: '/logos/csk-logo.png',
      gradient: {
        from: '#FFD600',
        to: '#FFC300', // Golden Yellow
      },
    },
    SRH: {
      name: 'Sunrisers Hyderabad',
      primaryColor: '#F15A24', // Vivid Orange
      secondaryColor: '#231F20', // Charcoal Black
      textColor: '#FFFFFF', // White
      backgroundColor: '#F15A2420', // Transparent Orange
      logo: '/logos/srh-logo.png',
      gradient: {
        from: '#F15A24',
        to: '#C7461C', // Deep Orange
      },
    },
    RR: {
      name: 'Rajasthan Royals',
      primaryColor: '#E91E63', // Vibrant Pink
      secondaryColor: '#FFFFFF', // White
      textColor: '#FFFFFF', // White
      backgroundColor: '#E91E6310', // Transparent Pink
      logo: '/logos/rr-logo.png',
      gradient: {
        from: '#E91E63',
        to: '#AD1457', // Deep Magenta
      },
    },
    KKR: {
      name: 'Kolkata Knight Riders',
      primaryColor: '#4B0082', // Royal Purple
      secondaryColor: '#FFD700', // Gold
      textColor: '#FFFFFF', // White
      backgroundColor: '#4B008210', // Transparent Purple
      logo: '/logos/kkr-logo.png',
      gradient: {
        from: '#4B0082',
        to: '#301934', // Deep Violet
      },
    },
    LSG: {
      name: 'Lucknow Super Giants',
      primaryColor: '#28A745', // Fresh Green
      secondaryColor: '#1A1A1A', // Deep Black
      textColor: '#FFFFFF', // White
      backgroundColor: '#28A74510', // Transparent Green
      logo: '/logos/lsg-logo.png',
      gradient: {
        from: '#28A745',
        to: '#156D34', // Forest Green
      },
    },
    DC: {
      name: 'Delhi Capitals',
      primaryColor: '#0047AB', // Sapphire Blue
      secondaryColor: '#1A1A1A', // Deep Black
      textColor: '#FFFFFF', // White
      backgroundColor: '#0047AB10', // Transparent Teal
      logo: '/logos/dc-logo.png',
      gradient: {
        from: '#0047AB',
        to: '#002D66', // Midnight Blue
      },
    },
  };
  
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