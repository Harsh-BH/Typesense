"use client";

import { useState } from "react";
import { themes, Theme } from "@/lib/themes";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, CheckIcon } from "lucide-react";

interface ThemeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: string;
  onThemeChange: (themeId: string) => void;
}

export default function ThemeSelector({
  isOpen,
  onClose,
  currentTheme,
  onThemeChange
}: ThemeSelectorProps) {
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25 }}
          className="fixed inset-y-0 right-0 w-80 bg-white dark:bg-zinc-900 shadow-lg border-l dark:border-zinc-800 z-50 overflow-auto"
        >
          <div className="p-4 border-b dark:border-zinc-800 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Theme Selector</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ChevronLeftIcon className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="p-4 space-y-4">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Select from one of our 20 pre-designed themes
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {themes.map((theme) => (
                <motion.div
                  key={theme.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onThemeChange(theme.id)}
                  onMouseEnter={() => setHoveredTheme(theme.id)}
                  onMouseLeave={() => setHoveredTheme(null)}
                  className={`relative cursor-pointer rounded-lg overflow-hidden ${
                    currentTheme === theme.id ? "ring-2 ring-offset-2 ring-blue-500" : ""
                  }`}
                >
                  <div className={`p-4 h-24 flex flex-col justify-center items-center ${theme.colors.background}`}>
                    <span className={`text-sm font-medium ${theme.colors.foreground}`}>
                      {theme.name}
                    </span>
                  </div>
                  
                  {hoveredTheme === theme.id && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
                    >
                      <span className="text-white text-xs">Preview</span>
                    </motion.div>
                  )}
                  
                  {currentTheme === theme.id && (
                    <div className="absolute top-2 right-2">
                      <CheckIcon className="h-4 w-4 text-blue-500" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="p-4 border-t dark:border-zinc-800">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Themes affect the color scheme of the application. Your progress and settings are saved regardless of theme.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
