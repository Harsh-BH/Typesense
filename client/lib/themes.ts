export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    border: string;
  };
}

export const themes: Theme[] = [
  {
    id: "light",
    name: "Light",
    description: "Default light theme",
    colors: {
      background: "bg-zinc-50",
      foreground: "text-zinc-900",
      card: "bg-white",
      cardForeground: "text-zinc-900",
      popover: "bg-white",
      popoverForeground: "text-zinc-900",
      primary: "bg-zinc-900",
      primaryForeground: "text-white",
      secondary: "bg-zinc-100",
      secondaryForeground: "text-zinc-900",
      muted: "bg-zinc-100",
      mutedForeground: "text-zinc-500",
      accent: "bg-zinc-100",
      accentForeground: "text-zinc-900",
      border: "border-zinc-200"
    }
  },
  {
    id: "dark",
    name: "Dark",
    description: "Default dark theme",
    colors: {
      background: "bg-zinc-900",
      foreground: "text-zinc-50",
      card: "bg-zinc-800",
      cardForeground: "text-zinc-50",
      popover: "bg-zinc-800",
      popoverForeground: "text-zinc-50",
      primary: "bg-zinc-50",
      primaryForeground: "text-zinc-900",
      secondary: "bg-zinc-800",
      secondaryForeground: "text-zinc-50",
      muted: "bg-zinc-800",
      mutedForeground: "text-zinc-400",
      accent: "bg-zinc-800",
      accentForeground: "text-zinc-50",
      border: "border-zinc-800"
    }
  },
  {
    id: "midnight",
    name: "Midnight Blue",
    description: "Deep blue dark theme",
    colors: {
      background: "bg-blue-950",
      foreground: "text-blue-50",
      card: "bg-blue-900",
      cardForeground: "text-blue-50",
      popover: "bg-blue-900",
      popoverForeground: "text-blue-50",
      primary: "bg-blue-500",
      primaryForeground: "text-white",
      secondary: "bg-blue-800",
      secondaryForeground: "text-blue-50",
      muted: "bg-blue-800",
      mutedForeground: "text-blue-300",
      accent: "bg-blue-800",
      accentForeground: "text-blue-50",
      border: "border-blue-800"
    }
  },
  {
    id: "forest",
    name: "Forest Green",
    description: "Soothing green theme",
    colors: {
      background: "bg-green-50",
      foreground: "text-green-900",
      card: "bg-white",
      cardForeground: "text-green-900",
      popover: "bg-white",
      popoverForeground: "text-green-900",
      primary: "bg-green-600",
      primaryForeground: "text-white",
      secondary: "bg-green-100",
      secondaryForeground: "text-green-900",
      muted: "bg-green-100",
      mutedForeground: "text-green-500",
      accent: "bg-green-100",
      accentForeground: "text-green-900",
      border: "border-green-200"
    }
  },
  {
    id: "ruby",
    name: "Ruby Red",
    description: "Vibrant red theme",
    colors: {
      background: "bg-red-50",
      foreground: "text-red-900",
      card: "bg-white",
      cardForeground: "text-red-900",
      popover: "bg-white",
      popoverForeground: "text-red-900",
      primary: "bg-red-600",
      primaryForeground: "text-white",
      secondary: "bg-red-100",
      secondaryForeground: "text-red-900",
      muted: "bg-red-100",
      mutedForeground: "text-red-500",
      accent: "bg-red-100",
      accentForeground: "text-red-900",
      border: "border-red-200"
    }
  },
  {
    id: "lavender",
    name: "Lavender",
    description: "Calm purple theme",
    colors: {
      background: "bg-purple-50",
      foreground: "text-purple-900",
      card: "bg-white",
      cardForeground: "text-purple-900",
      popover: "bg-white",
      popoverForeground: "text-purple-900",
      primary: "bg-purple-600",
      primaryForeground: "text-white",
      secondary: "bg-purple-100",
      secondaryForeground: "text-purple-900",
      muted: "bg-purple-100",
      mutedForeground: "text-purple-500",
      accent: "bg-purple-100",
      accentForeground: "text-purple-900",
      border: "border-purple-200"
    }
  },
  {
    id: "sunset",
    name: "Sunset",
    description: "Warm orange and red theme",
    colors: {
      background: "bg-orange-50",
      foreground: "text-orange-900",
      card: "bg-white",
      cardForeground: "text-orange-900",
      popover: "bg-white",
      popoverForeground: "text-orange-900",
      primary: "bg-orange-500",
      primaryForeground: "text-white",
      secondary: "bg-orange-100",
      secondaryForeground: "text-orange-900",
      muted: "bg-orange-100",
      mutedForeground: "text-orange-500",
      accent: "bg-orange-100",
      accentForeground: "text-orange-900",
      border: "border-orange-200"
    }
  },
  {
    id: "ocean",
    name: "Ocean",
    description: "Deep blue and teal theme",
    colors: {
      background: "bg-cyan-50",
      foreground: "text-cyan-900",
      card: "bg-white",
      cardForeground: "text-cyan-900",
      popover: "bg-white",
      popoverForeground: "text-cyan-900",
      primary: "bg-cyan-600",
      primaryForeground: "text-white",
      secondary: "bg-cyan-100",
      secondaryForeground: "text-cyan-900",
      muted: "bg-cyan-100",
      mutedForeground: "text-cyan-500",
      accent: "bg-cyan-100",
      accentForeground: "text-cyan-900",
      border: "border-cyan-200"
    }
  },
  {
    id: "desert",
    name: "Desert",
    description: "Warm sandy theme",
    colors: {
      background: "bg-yellow-50",
      foreground: "text-yellow-900",
      card: "bg-white",
      cardForeground: "text-yellow-900",
      popover: "bg-white",
      popoverForeground: "text-yellow-900",
      primary: "bg-yellow-600",
      primaryForeground: "text-white",
      secondary: "bg-yellow-100",
      secondaryForeground: "text-yellow-900",
      muted: "bg-yellow-100",
      mutedForeground: "text-yellow-600",
      accent: "bg-yellow-100",
      accentForeground: "text-yellow-900",
      border: "border-yellow-200"
    }
  },
  {
    id: "neon",
    name: "Neon",
    description: "Vibrant neon theme",
    colors: {
      background: "bg-black",
      foreground: "text-white",
      card: "bg-zinc-900",
      cardForeground: "text-white",
      popover: "bg-zinc-900",
      popoverForeground: "text-white",
      primary: "bg-pink-500",
      primaryForeground: "text-white",
      secondary: "bg-purple-500",
      secondaryForeground: "text-white",
      muted: "bg-zinc-800",
      mutedForeground: "text-zinc-400",
      accent: "bg-indigo-500",
      accentForeground: "text-white",
      border: "border-zinc-800"
    }
  },
  {
    id: "monochrome",
    name: "Monochrome",
    description: "Black and white theme",
    colors: {
      background: "bg-white",
      foreground: "text-black",
      card: "bg-white",
      cardForeground: "text-black",
      popover: "bg-white",
      popoverForeground: "text-black",
      primary: "bg-black",
      primaryForeground: "text-white",
      secondary: "bg-gray-200",
      secondaryForeground: "text-black",
      muted: "bg-gray-100",
      mutedForeground: "text-gray-500",
      accent: "bg-gray-100",
      accentForeground: "text-black",
      border: "border-gray-200"
    }
  },
  {
    id: "pastel",
    name: "Pastel",
    description: "Soft pastel colors",
    colors: {
      background: "bg-pink-50",
      foreground: "text-pink-900",
      card: "bg-white",
      cardForeground: "text-pink-900",
      popover: "bg-white",
      popoverForeground: "text-pink-900",
      primary: "bg-pink-300",
      primaryForeground: "text-white",
      secondary: "bg-blue-200",
      secondaryForeground: "text-blue-900",
      muted: "bg-purple-100",
      mutedForeground: "text-purple-500",
      accent: "bg-yellow-200",
      accentForeground: "text-yellow-900",
      border: "border-pink-200"
    }
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Futuristic neon theme",
    colors: {
      background: "bg-violet-950",
      foreground: "text-yellow-300",
      card: "bg-violet-900",
      cardForeground: "text-yellow-200",
      popover: "bg-violet-900",
      popoverForeground: "text-yellow-200",
      primary: "bg-cyan-400",
      primaryForeground: "text-black",
      secondary: "bg-pink-500",
      secondaryForeground: "text-white",
      muted: "bg-violet-800",
      mutedForeground: "text-violet-300",
      accent: "bg-yellow-400",
      accentForeground: "text-black",
      border: "border-violet-700"
    }
  },
  {
    id: "retro",
    name: "Retro",
    description: "80s inspired theme",
    colors: {
      background: "bg-teal-900",
      foreground: "text-teal-100",
      card: "bg-teal-800",
      cardForeground: "text-teal-100",
      popover: "bg-teal-800",
      popoverForeground: "text-teal-100",
      primary: "bg-orange-500",
      primaryForeground: "text-white",
      secondary: "bg-purple-500",
      secondaryForeground: "text-white",
      muted: "bg-teal-700",
      mutedForeground: "text-teal-300",
      accent: "bg-red-500",
      accentForeground: "text-white",
      border: "border-teal-700"
    }
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean minimal interface",
    colors: {
      background: "bg-gray-50",
      foreground: "text-gray-900",
      card: "bg-white",
      cardForeground: "text-gray-900",
      popover: "bg-white",
      popoverForeground: "text-gray-900",
      primary: "bg-gray-900",
      primaryForeground: "text-white",
      secondary: "bg-gray-100",
      secondaryForeground: "text-gray-900",
      muted: "bg-gray-100",
      mutedForeground: "text-gray-500",
      accent: "bg-gray-100",
      accentForeground: "text-gray-900",
      border: "border-gray-200"
    }
  },
  {
    id: "coffee",
    name: "Coffee",
    description: "Warm brown theme",
    colors: {
      background: "bg-amber-50",
      foreground: "text-amber-900",
      card: "bg-white",
      cardForeground: "text-amber-900",
      popover: "bg-white",
      popoverForeground: "text-amber-900",
      primary: "bg-amber-700",
      primaryForeground: "text-white",
      secondary: "bg-amber-100",
      secondaryForeground: "text-amber-900",
      muted: "bg-amber-100",
      mutedForeground: "text-amber-500",
      accent: "bg-amber-200",
      accentForeground: "text-amber-900",
      border: "border-amber-200"
    }
  },
  {
    id: "autumn",
    name: "Autumn",
    description: "Fall-inspired colors",
    colors: {
      background: "bg-orange-100",
      foreground: "text-orange-950",
      card: "bg-white",
      cardForeground: "text-orange-950",
      popover: "bg-white",
      popoverForeground: "text-orange-950",
      primary: "bg-orange-600",
      primaryForeground: "text-white",
      secondary: "bg-red-200",
      secondaryForeground: "text-red-900",
      muted: "bg-orange-200",
      mutedForeground: "text-orange-700",
      accent: "bg-yellow-500",
      accentForeground: "text-white",
      border: "border-orange-300"
    }
  },
  {
    id: "spring",
    name: "Spring",
    description: "Fresh springtime colors",
    colors: {
      background: "bg-lime-50",
      foreground: "text-lime-900",
      card: "bg-white",
      cardForeground: "text-lime-900",
      popover: "bg-white",
      popoverForeground: "text-lime-900",
      primary: "bg-lime-500",
      primaryForeground: "text-white",
      secondary: "bg-pink-100",
      secondaryForeground: "text-pink-900",
      muted: "bg-lime-100",
      mutedForeground: "text-lime-500",
      accent: "bg-yellow-200",
      accentForeground: "text-yellow-900",
      border: "border-lime-200"
    }
  },
  {
    id: "winter",
    name: "Winter",
    description: "Cool winter theme",
    colors: {
      background: "bg-sky-50",
      foreground: "text-sky-900",
      card: "bg-white",
      cardForeground: "text-sky-900",
      popover: "bg-white",
      popoverForeground: "text-sky-900",
      primary: "bg-sky-600",
      primaryForeground: "text-white",
      secondary: "bg-indigo-100",
      secondaryForeground: "text-indigo-900",
      muted: "bg-sky-100",
      mutedForeground: "text-sky-500",
      accent: "bg-indigo-200",
      accentForeground: "text-indigo-900",
      border: "border-sky-200"
    }
  },
  {
    id: "summer",
    name: "Summer",
    description: "Bright summer colors",
    colors: {
      background: "bg-yellow-50",
      foreground: "text-yellow-900",
      card: "bg-white",
      cardForeground: "text-yellow-900",
      popover: "bg-white",
      popoverForeground: "text-yellow-900",
      primary: "bg-yellow-500",
      primaryForeground: "text-white",
      secondary: "bg-green-100",
      secondaryForeground: "text-green-900",
      muted: "bg-yellow-100",
      mutedForeground: "text-yellow-500",
      accent: "bg-blue-200",
      accentForeground: "text-blue-900",
      border: "border-yellow-200"
    }
  },
]
