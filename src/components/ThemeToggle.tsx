'use client';

import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme, ThemeMode } from '../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'compact' | 'full';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'compact', className = '' }) => {
  const { themeMode, setThemeMode, resolvedTheme } = useTheme();

  // 'full' matches the taller header and its larger action cluster;
  // 'compact' keeps the original footprint for the footer and mobile bar.
  const isFull = variant === 'full';
  const buttonPadding = isFull ? 'p-2.5' : 'p-2';
  const iconSize = isFull ? 'w-5 h-5' : 'w-4 h-4';

  const cycleTheme = () => {
    if (themeMode === 'light') setThemeMode('dark');
    else if (themeMode === 'dark') setThemeMode('system');
    else setThemeMode('light');
  };

  const getIcon = () => {
    if (themeMode === 'light') {
      return <Sun className={`${iconSize} text-[#B8860B] dark:text-[#C5A880] transition-transform duration-300 group-hover:rotate-45`} />;
    } else if (themeMode === 'dark') {
      return <Moon className={`${iconSize} text-[#C5A880] transition-transform duration-300 group-hover:-rotate-12`} />;
    } else {
      return <Laptop className={`${iconSize} text-[#8C6D44] dark:text-[#C5A880] transition-transform duration-300 group-hover:scale-110`} />;
    }
  };

  const getLabel = () => {
    if (themeMode === 'light') return 'Light Theme (Click for Dark)';
    if (themeMode === 'dark') return 'Dark Theme (Click for System)';
    return 'System Theme (Click for Light)';
  };

  return (
    <button
      onClick={cycleTheme}
      id="theme-toggle-icon-btn"
      type="button"
      title={getLabel()}
      aria-label={getLabel()}
      className={`group ${buttonPadding} rounded-full border border-[#D5CDC4] dark:border-[#332F2B] bg-[#FAF8F5] dark:bg-[#181614] hover:bg-[#F2ECE4] dark:hover:bg-[#24211E] text-[#1A1918] dark:text-[#F5F2ED] shadow-sm transition-all flex items-center justify-center cursor-pointer ${className}`}
    >
      {getIcon()}
    </button>
  );
};

