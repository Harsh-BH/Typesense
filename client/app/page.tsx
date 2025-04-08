"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import TypingTest from "@/components/typing-test";
import { MoonIcon, SunIcon, TypeIcon, TimerIcon, QuoteIcon, KeyboardIcon } from "@/components/icons";
import ThemeSelector from "@/components/theme-selector";
import { PaletteIcon } from "lucide-react";
import { useTheme } from "@/context/theme-context";
import { Theme, themes } from "@/lib/themes";

export default function Home() {
  const { currentTheme, setTheme, isLightMode, toggleLightDark } = useTheme();
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("words");

  const handleThemeChange = (themeId: string) => {
    setTheme(themeId);
    setIsThemeSelectorOpen(false);
    const themeName = themes.find(t => t.id === themeId)?.name || themeId;
    
    toast({
      title: `Theme changed to ${themeName}`,
      duration: 1500,
    });
  };

  // Handle tab changes to force component refresh
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Get current theme colors
  const getThemeClass = (colorType: keyof Theme['colors']) => {
    const theme = themes.find(t => t.id === currentTheme);
    return theme?.colors[colorType] || "";
  };

  return (
    <div className={`min-h-screen ${getThemeClass('background')} ${getThemeClass('foreground')} flex flex-col`}>
      {/* Theme Selector Sidebar */}
      <ThemeSelector 
        isOpen={isThemeSelectorOpen} 
        onClose={() => setIsThemeSelectorOpen(false)} 
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
      />

      {/* Minimal Navbar */}
      <motion.nav 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`px-6 py-4 flex items-center justify-between`}
      >
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
        >
          <motion.span 
            className="text-xl font-bold flex items-center gap-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <KeyboardIcon className="h-5 w-5" /> keytest
          </motion.span>
          <Badge variant="secondary" className="bg-yellow-400 dark:bg-yellow-600 text-black hover:bg-yellow-500">beta</Badge>
        </motion.div>
        
        <div className="flex gap-2">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsThemeSelectorOpen(true)} 
                    className="transition-all duration-200"
                  >
                    <PaletteIcon className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Choose theme</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={toggleLightDark} 
                    className="transition-all duration-200"
                  >
                    {isLightMode ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle {isLightMode ? "dark" : "light"} mode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        </div>
      </motion.nav>

      {/* Main Content - Full Width Typing Test */}
      <main className="flex-1 flex flex-col w-full px-4 py-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.4 }}
          className="w-full h-full"
        >
          <div className="w-full h-full">
            <Tabs 
              defaultValue="words" 
              className="w-full"
              onValueChange={handleTabChange}
            >
              <div className="flex justify-center items-center mb-6">
                <TabsList className={`${getThemeClass('muted')}`}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <TabsTrigger value="words" className="transition-all duration-200 flex items-center gap-1 text-base">
                          <TypeIcon className="h-4 w-4" /> Words
                        </TabsTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Type a fixed number of words</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <TabsTrigger value="time" className="transition-all duration-200 flex items-center gap-1 text-base">
                          <TimerIcon className="h-4 w-4" /> Time
                        </TabsTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Type as many words as possible in a set time</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <TabsTrigger value="quote" className="transition-all duration-200 flex items-center gap-1 text-base">
                          <QuoteIcon className="h-4 w-4" /> Quote
                        </TabsTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Type a full quote from start to finish</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TabsList>
              </div>
              <TabsContent value="words" className="mt-0">
                <TypingTest 
                  key={`words-${activeTab === 'words' ? 'active' : 'inactive'}`} 
                  mode="words" 
                />
              </TabsContent>
              <TabsContent value="time" className="mt-0">
                <TypingTest 
                  key={`time-${activeTab === 'time' ? 'active' : 'inactive'}`} 
                  mode="time" 
                />
              </TabsContent>
              <TabsContent value="quote" className="mt-0">
                <TypingTest 
                  key={`quote-${activeTab === 'quote' ? 'active' : 'inactive'}`} 
                  mode="quote" 
                />
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </main>
      
      <Toaster />
    </div>
  );
}
