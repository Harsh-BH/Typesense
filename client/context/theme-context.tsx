"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { themes, Theme } from "@/lib/themes";

type ThemeContextType = {
  currentTheme: string;
  setTheme: (themeId: string) => void;
  isLightMode: boolean;
  toggleLightDark: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: "dark",
  setTheme: () => {},
  isLightMode: false,
  toggleLightDark: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<string>("dark");
  
  // Function to determine if the current theme is considered "light" or "dark"
  const isLightMode = (): boolean => {
    const theme = themes.find(t => t.id === currentTheme);
    return theme?.id === "light" || ["forest", "ruby", "lavender", 
      "sunset", "ocean", "desert", "pastel", "minimalist", "coffee", 
      "autumn", "spring", "winter", "summer"].includes(theme?.id || "");
  };
  
  // Function to toggle between light and dark modes
  const toggleLightDark = () => {
    setCurrentTheme(prev => isLightMode() ? "dark" : "light");
  };

  // Apply theme on change
  useEffect(() => {
    const theme = themes.find(t => t.id === currentTheme);
    
    // Toggle dark mode for tailwind
    if (isLightMode()) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    
    // Save theme to localStorage
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);
  
  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme: setCurrentTheme,
        isLightMode: isLightMode(),
        toggleLightDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
