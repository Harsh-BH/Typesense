import typingData from '@/data/typing-data.json';

// Store sets of used content (persists until page refresh)
const usedWords = new Set<string>();
const usedQuotes = new Set<string>();
const usedParagraphs = new Set<string>();

/**
 * Get a random array of unique words that haven't been used in the current session
 */
export function getUniqueWords(count: number): string[] {
  // Make a copy of the original array to avoid modifying it
  let availableWords = [...typingData.words].filter(word => !usedWords.has(word));
  
  // If we're running out of unused words, reset the tracking
  if (availableWords.length < count) {
    usedWords.clear(); // Reset used words
    availableWords = [...typingData.words]; // Use all words again
  }
  
  // Shuffle the available words
  const shuffled = availableWords.sort(() => 0.5 - Math.random());
  
  // Take the number of words we need
  const selected = shuffled.slice(0, count);
  
  // Mark these words as used
  selected.forEach(word => usedWords.add(word));
  
  return selected;
}

/**
 * Get a unique quote that hasn't been used in the current session
 */
export function getUniqueQuote(): string {
  // Filter out quotes that have already been used
  let availableQuotes = typingData.quotes.filter(quote => !usedQuotes.has(quote));
  
  // If we're out of unused quotes, reset the tracking
  if (availableQuotes.length === 0) {
    usedQuotes.clear();
    availableQuotes = [...typingData.quotes];
  }
  
  // Pick a random quote
  const randomIndex = Math.floor(Math.random() * availableQuotes.length);
  const selectedQuote = availableQuotes[randomIndex];
  
  // Mark this quote as used
  usedQuotes.add(selectedQuote);
  
  return selectedQuote;
}

/**
 * Get a random paragraph that hasn't been used in the current session
 */
export function getUniqueParagraph(): string {
  const availableParagraphs = typingData.paragraphs.filter(para => !usedParagraphs.has(para));
  
  // If we've used all paragraphs, reset and make all available again
  if (availableParagraphs.length === 0) {
    usedParagraphs.clear();
    return getUniqueParagraph();
  }
  
  // Pick a random paragraph
  const randomIndex = Math.floor(Math.random() * availableParagraphs.length);
  const selectedParagraph = availableParagraphs[randomIndex];
  
  // Mark this paragraph as used
  usedParagraphs.add(selectedParagraph);
  
  return selectedParagraph;
}

/**
 * Reset all used content tracking
 */
export function resetUsedContent(): void {
  usedWords.clear();
  usedQuotes.clear();
  usedParagraphs.clear();
}

/**
 * Force a specific content type to be regenerated
 */
export function resetContentType(type: 'words' | 'quotes' | 'paragraphs'): void {
  if (type === 'words') {
    usedWords.clear();
  } else if (type === 'quotes') {
    usedQuotes.clear();
  } else if (type === 'paragraphs') {
    usedParagraphs.clear();
  }
  
  console.log(`Reset ${type} content tracking.`);
}
