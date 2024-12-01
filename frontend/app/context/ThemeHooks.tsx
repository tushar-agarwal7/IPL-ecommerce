import { useTheme } from './ThemeContext';
import { twMerge } from 'tailwind-merge';

// Hook to generate dynamic Tailwind classes based on team theme
export const useDynamicTheme = () => {
  const { theme } = useTheme();

  // Generate dynamic Tailwind classes
  const getDynamicClasses = (baseClasses: string = '') => {
    if (!theme) return baseClasses;

    const themeClasses = `
      bg-gradient-to-br 
      from-[${theme.gradient.from}] 
      to-[${theme.gradient.to}] 
      text-[${theme.textColor}]
    `;

    return twMerge(baseClasses, themeClasses);
  };

  // Button style generator
  const getButtonClasses = () => {
    if (!theme) return '';
    return `
      bg-[${theme.primaryColor}] 
      hover:bg-[${theme.secondaryColor}] 
      text-[${theme.textColor}]
    `;
  };

  // Card style generator
  const getCardClasses = () => {
    if (!theme) return '';
    return `
      border-[${theme.primaryColor}] 
      hover:shadow-[${theme.primaryColor}]
    `;
  };

  return {
    theme,
    getDynamicClasses,
    getButtonClasses,
    getCardClasses
  };
};

// Wrapper component to apply theme
export const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { getDynamicClasses } = useDynamicTheme();

  return (
    <div className={getDynamicClasses('min-h-screen')}>
      {children}
    </div>
  );
};