"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertCircle, RefreshCcw, RotateCcw, Keyboard, Clock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TypeIcon, TimerIcon, QuoteIcon } from "@/components/icons";
import { getUniqueWords, getUniqueQuote, resetUsedContent } from "@/lib/typing-test-utils";
import { Input } from "@/components/ui/input";

// Sample word list
const wordsList = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "I", 
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what"
];

// Sample quotes
const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "All that glitters is not gold.",
  "The only thing we have to fear is fear itself.",
  "To be or not to be, that is the question.",
  "You can fool all of the people some of the time, and some of the people all of the time, but you cannot fool all of the people all of the time."
];

interface TypingTestProps {
  mode?: "words" | "time" | "quote";
  wordCount?: number;
  timeLimit?: number;
}

const TIME_OPTIONS = [15, 30, 60, 120];

const TypingTest = ({ 
  mode = "words", 
  wordCount = 25, 
  timeLimit = 30 
}: TypingTestProps) => {
  const [words, setWords] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [correctWords, setCorrectWords] = useState<boolean[]>([]);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [selectedTimeLimit, setSelectedTimeLimit] = useState(timeLimit);
  const [customTimeInput, setCustomTimeInput] = useState("");
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);
  const [textContainerRef, setTextContainerRef] = useState<HTMLDivElement | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [contentKey, setContentKey] = useState(0); // Add a key to force re-renders
  
  const inputRef = useRef<HTMLInputElement>(null);
  const wordElementsRef = useRef<(HTMLSpanElement | null)[]>([]);
  
  // Initialize the test - Separate word generation from other initializations
  useEffect(() => {
    // Only generate words once when component mounts or mode changes
    if (!isInitialized) {
      let testWords: string[] = [];
      
      if (mode === "words") {
        // Get unique words from our utils
        testWords = getUniqueWords(wordCount);
        setWords(testWords);
        setCorrectWords(Array(testWords.length).fill(null));
      } else if (mode === "quote") {
        // Get unique quote from our utils
        const quote = getUniqueQuote();
        const quoteWords = quote.split(/\s+/);
        setWords(quoteWords);
        setCorrectWords(Array(quoteWords.length).fill(null));
      } else {
        // Time mode - use more words than might be needed
        testWords = getUniqueWords(100); // More words than likely needed for time test
        setWords(testWords);
        setCorrectWords(Array(testWords.length).fill(null));
      }
      setIsInitialized(true);
      
      // Log that new content was loaded (for debugging)
      console.log("New content loaded:", testWords.slice(0, 3).join(", ") + "...");
    }
    
    // Focus on the input field automatically
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
  }, [mode, wordCount, isInitialized, contentKey]); // Add contentKey as dependency
  
  // Handle container and line height calculations separately
  useEffect(() => {
    if (textContainerRef) {
      setLineHeight(textContainerRef.offsetHeight / 4);
    }
  }, [textContainerRef]);

  // Reset initialization when mode changes
  useEffect(() => {
    setIsInitialized(false);
  }, [mode]);

  // Timer for time mode
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (started && mode === "time" && !finished) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [started, mode, finished]);

  // Calculate progress
  useEffect(() => {
    if (mode === "words" || mode === "quote") {
      setProgress((currentWordIndex / words.length) * 100);
    } else {
      setProgress(((timeLimit - timeLeft) / timeLimit) * 100);
    }
  }, [currentWordIndex, words.length, timeLeft, timeLimit, mode]);

  // Handle time limit changes
  useEffect(() => {
    if (!started) {
      setTimeLeft(selectedTimeLimit);
    }
  }, [selectedTimeLimit, started]);

  // Handle custom time input
  const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setCustomTimeInput(value);
    }
  };

  const applyCustomTime = () => {
    const customTime = parseInt(customTimeInput, 10);
    if (customTime > 0) {
      setSelectedTimeLimit(customTime);
    } else {
      // Default to 30 seconds if invalid input
      setSelectedTimeLimit(30);
      setCustomTimeInput("30");
    }
  };

  // Handle time option selection
  const selectTimeOption = (time: number) => {
    setSelectedTimeLimit(time);
    setCustomTimeInput("");
  };

  const startTest = () => {
    setStarted(true);
    setStartTime(Date.now());
    setCurrentWordIndex(0);
    setInput("");
    // Don't regenerate words or reset correctWords here
    setFinished(false);
    setTotalKeystrokes(0);
    setErrorCount(0);
    inputRef.current?.focus();
  };

  const finishTest = () => {
    setFinished(true);
    setEndTime(Date.now());
  };

  const resetTest = () => {
    // When resetting, generate new content
    setIsInitialized(false);
    setStarted(false);
    setFinished(false);
    setCurrentWordIndex(0);
    setInput("");
    setTimeLeft(selectedTimeLimit); // Use the selected time limit
    setTotalKeystrokes(0);
    setErrorCount(0);
    
    // Force re-render with new content
    setContentKey(prevKey => prevKey + 1);
  };

  // Add a new function to completely reset all tracked content
  const fullReset = () => {
    resetUsedContent(); // Clear all used content tracking
    resetTest();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Auto-start when user types
    if (!started) {
      startTest();
      return;
    }
    
    if (e.key === " " && input.trim() !== "") {
      e.preventDefault();
      
      // Check if the word is correct
      const isCorrect = input.trim() === words[currentWordIndex];
      const newCorrectWords = [...correctWords];
      newCorrectWords[currentWordIndex] = isCorrect;
      setCorrectWords(newCorrectWords);
      
      if (currentWordIndex === words.length - 1 || (mode === "quote" && currentWordIndex === words.length - 1)) {
        finishTest();
      } else {
        setCurrentWordIndex(currentWordIndex + 1);
        setInput("");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setTotalKeystrokes(totalKeystrokes + 1);
    
    // Check for errors by comparing with the current word
    const currentWord = words[currentWordIndex];
    const currentInput = e.target.value;
    let errorFlag = false;
    
    // Compare each character
    for (let i = 0; i < currentInput.length; i++) {
      if (i >= currentWord.length || currentInput[i] !== currentWord[i]) {
        errorFlag = true;
        break;
      }
    }
    
    if (errorFlag) {
      setErrorCount(errorCount + 1);
    }
  };

  const calculateWPM = () => {
    if (!startTime || !endTime) return 0;
    
    const timeInMinutes = (endTime - startTime) / 1000 / 60;
    const wordsTyped = correctWords.filter(Boolean).length;
    
    return Math.round(wordsTyped / timeInMinutes);
  };

  const calculateAccuracy = () => {
    if (totalKeystrokes === 0) return 100;
    return Math.round(100 - ((errorCount / totalKeystrokes) * 100));
  };

  useEffect(() => {
    // Scroll the current word into view properly so that multiple lines are visible
    if (wordElementsRef.current[currentWordIndex] && textContainerRef) {
      const currentWordElement = wordElementsRef.current[currentWordIndex];
      const containerTop = textContainerRef.scrollTop;
      const containerBottom = containerTop + textContainerRef.offsetHeight;
      const elementTop = currentWordElement!.offsetTop;
      
      // Position the current word in the top third of the container
      // This helps show 3 lines (current + 2 upcoming lines)
      if (elementTop < containerTop || elementTop > containerBottom - lineHeight) {
        textContainerRef.scrollTop = Math.max(0, elementTop - lineHeight);
      }
    }
  }, [currentWordIndex, lineHeight]);

  return (
    <motion.div 
      key={`test-${contentKey}-${mode}`} // Add key to force re-render
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-5 w-full max-w-[90%] mx-auto"
    >
      {!started && !finished ? (
        <div className="space-y-5 w-full">
          <div className="flex justify-between items-start mb-6">
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-3"
              >
                <h3 className="text-xl font-semibold">Start typing to begin</h3>
                <p className="text-base text-zinc-600 dark:text-zinc-400">
                  {mode === "words" && `Type ${wordCount} words as fast as you can`}
                  {mode === "time" && `Type as many words as possible in ${selectedTimeLimit} seconds`}
                  {mode === "quote" && "Type the quote as fast as you can"}
                </p>
              </motion.div>
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="py-1.5 px-3 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-sm rounded-full flex items-center gap-1"
            >
              <Keyboard className="h-3 w-3" /> Ready
            </motion.div>
          </div>
          
          {/* Time Selection Option - Only show for time mode */}
          {mode === "time" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-3 bg-zinc-100/60 dark:bg-zinc-800/60 p-4 rounded-lg"
            >
              <h4 className="text-base font-medium mb-3 flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> Set Timer Duration
              </h4>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {TIME_OPTIONS.map(time => (
                  <Button 
                    key={time}
                    variant={selectedTimeLimit === time ? "default" : "outline"}
                    onClick={() => selectTimeOption(time)}
                    className="text-base"
                  >
                    {time}s
                  </Button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm">Custom:</div>
                <Input 
                  type="text"
                  placeholder="seconds"
                  value={customTimeInput}
                  onChange={handleCustomTimeChange}
                  className="w-24 text-base"
                />
                <Button 
                  variant="secondary" 
                  onClick={applyCustomTime}
                  disabled={!customTimeInput}
                  className="text-base"
                >
                  Apply
                </Button>
              </div>
            </motion.div>
          )}
          
          <div 
            ref={setTextContainerRef}
            className="relative bg-zinc-100/60 dark:bg-zinc-800/60 p-6 rounded-lg font-mono text-xl md:text-2xl leading-relaxed mb-4 h-[220px] overflow-y-auto flex flex-wrap"
            onClick={() => inputRef.current?.focus()}
          >
            {words.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                ref={(el) => (wordElementsRef.current[index] = el)}
                initial={{ opacity: 0.8 }}
                animate={{ 
                  opacity: index === 0 ? 1 : 0.7,
                  scale: index === 0 ? 1.03 : 1
                }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "mr-3 mb-3 px-1 rounded transition-colors",
                  index === 0 && "bg-yellow-200 dark:bg-yellow-800",
                )}
              >
                {word}
              </motion.span>
            ))}
          </div>
          
          {/* Hidden input field that captures keyboard input */}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="opacity-0 absolute pointer-events-auto w-full h-0"
            autoFocus
          />
          
          <Alert className="bg-zinc-100/40 dark:bg-zinc-800/40 border-0">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription className="text-base">
              Begin typing the highlighted word. Press space to advance to the next word.
            </AlertDescription>
          </Alert>
        </div>
      ) : finished ? (
        <div className="flex flex-col items-center justify-center space-y-6 py-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <div className="bg-zinc-100/40 dark:bg-zinc-800/40 p-8 rounded-lg">
              <h3 className="text-3xl font-semibold text-center mb-6">
                Your Results
              </h3>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col items-center p-4 rounded-lg bg-zinc-100/70 dark:bg-zinc-800/70">
                  <span className="text-base text-zinc-500 dark:text-zinc-400">Speed</span>
                  <span className="text-4xl font-bold">{calculateWPM()}</span>
                  <span className="text-base">WPM</span>
                </div>
                
                <div className="flex flex-col items-center p-4 rounded-lg bg-zinc-100/70 dark:bg-zinc-800/70">
                  <span className="text-base text-zinc-500 dark:text-zinc-400">Accuracy</span>
                  <span className="text-4xl font-bold">{calculateAccuracy()}%</span>
                  <span className="text-base">correct</span>
                </div>
                
                <div className="flex flex-col items-center p-4 rounded-lg bg-zinc-100/70 dark:bg-zinc-800/70">
                  <span className="text-base text-zinc-500 dark:text-zinc-400">Time</span>
                  <span className="text-4xl font-bold">
                    {mode === "time" 
                      ? selectedTimeLimit
                      : Math.round((endTime! - startTime!) / 1000)}
                  </span>
                  <span className="text-base">seconds</span>
                </div>
              </div>
              
              <div className="flex justify-center gap-6">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        onClick={resetTest}
                        size="lg" 
                        className="text-base bg-zinc-800 dark:bg-zinc-700 hover:bg-zinc-900 dark:hover:bg-zinc-600"
                      >
                        <RotateCcw className="mr-2 h-5 w-5" /> Try Again
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Restart with new content (different from what you've done)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        onClick={fullReset}
                        size="lg"
                        variant="outline"
                        className="text-base"
                      >
                        <RefreshCcw className="mr-2 h-5 w-5" /> Reset All Content
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Reset all tracked content (allows previous content to reappear)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="space-y-5 w-full">
          {/* Progress indicator */}
          <div className="flex justify-between items-center mb-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="text-base">
                    {mode === "words" || mode === "quote" 
                      ? `${currentWordIndex}/${words.length} words`
                      : `${timeLeft}s remaining`}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{mode === "time" ? "Time remaining" : "Words completed"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="secondary" className="text-base">
                    {calculateWPM()} WPM
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Current typing speed (words per minute)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <Progress value={progress} className="h-2 mb-5" />
          
          {/* Words display area - Full height and width */}
          <div 
            ref={setTextContainerRef}
            className="relative bg-zinc-100/60 dark:bg-zinc-800/60 p-6 rounded-lg font-mono text-xl md:text-2xl leading-relaxed mb-5 h-[220px] overflow-y-auto flex flex-wrap"
          >
            {words.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                ref={(el) => (wordElementsRef.current[index] = el)}
                initial={{ opacity: 0.8 }}
                animate={{ 
                  opacity: index >= currentWordIndex ? 1 : 0.5,
                  scale: index === currentWordIndex ? 1.03 : 1
                }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "mr-3 mb-3 px-1 rounded transition-colors",
                  index === currentWordIndex && "bg-yellow-200 dark:bg-yellow-800",
                  correctWords[index] === true && "text-green-600 dark:text-green-400",
                  correctWords[index] === false && "text-red-600 dark:text-red-400",
                  index < currentWordIndex && correctWords[index] === null && "text-gray-400 dark:text-gray-600"
                )}
              >
                {index === currentWordIndex ? (
                  <>
                    {word.split('').map((char, charIndex) => (
                      <span
                        key={charIndex}
                        className={cn(
                          charIndex < input.length && (
                            input[charIndex] === char 
                              ? "text-green-600 dark:text-green-400" 
                              : "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30"
                          ),
                          charIndex === input.length && "border-b-2 border-black dark:border-white animate-pulse"
                        )}
                      >
                        {char}
                      </span>
                    ))}
                  </>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </div>
          
          {/* Hidden input field that captures keyboard input */}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="opacity-0 absolute pointer-events-auto w-full h-0"
            autoFocus
          />
          
          <Alert className="bg-zinc-100/40 dark:bg-zinc-800/40 border-0">
            <AlertCircle className="h-5 w-5 mr-2" />
            <AlertDescription className="text-base">
              Type the highlighted word. Press space to advance to the next word.
            </AlertDescription>
          </Alert>
          
          <div className="flex justify-between mt-5">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-base flex items-center gap-1">
                      {mode === "words" ? <TypeIcon className="h-4 w-4" /> :
                       mode === "time" ? <TimerIcon className="h-4 w-4" /> :
                       <QuoteIcon className="h-4 w-4" />}
                      <span>{mode === "words" ? "Words" : mode === "time" ? "Time" : "Quote"} mode</span>
                    </Badge>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{
                    mode === "words" ? "Complete a fixed number of words" :
                    mode === "time" ? "Type as many words as possible in fixed time" :
                    "Type the entire quote accurately"
                  }</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <div className="flex gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="default" onClick={resetTest} className="text-base">
                      <RefreshCcw className="mr-2 h-4 w-4" /> New Content
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Restart with new content</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="default" onClick={fullReset} className="text-base">
                      <RefreshCcw className="h-4 w-4 mr-2" /> Reset All
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reset all tracked content</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TypingTest;
