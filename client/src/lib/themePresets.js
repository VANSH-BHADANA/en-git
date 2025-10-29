// Popular theme presets for GitHub customization

export const THEME_PRESETS = {
  "github-dark": {
    name: "GitHub Dark",
    description: "GitHub's default dark theme",
    primaryColor: "#58a6ff",
    accentColor: "#1f6feb",
    backgroundColor: "#0d1117",
    textColor: "#c9d1d9",
  },
  "github-light": {
    name: "GitHub Light",
    description: "GitHub's default light theme",
    primaryColor: "#0969da",
    accentColor: "#0550ae",
    backgroundColor: "#ffffff",
    textColor: "#24292f",
  },
  dracula: {
    name: "Dracula",
    description: "Dark theme with vibrant colors",
    primaryColor: "#ff79c6",
    accentColor: "#bd93f9",
    backgroundColor: "#282a36",
    textColor: "#f8f8f2",
  },
  nord: {
    name: "Nord",
    description: "Arctic, north-bluish color palette",
    primaryColor: "#88c0d0",
    accentColor: "#81a1c1",
    backgroundColor: "#2e3440",
    textColor: "#eceff4",
  },
  monokai: {
    name: "Monokai",
    description: "Classic Monokai theme",
    primaryColor: "#f92672",
    accentColor: "#fd971f",
    backgroundColor: "#272822",
    textColor: "#f8f8f2",
  },
  "solarized-dark": {
    name: "Solarized Dark",
    description: "Precision colors for machines and people",
    primaryColor: "#268bd2",
    accentColor: "#2aa198",
    backgroundColor: "#002b36",
    textColor: "#839496",
  },
  "solarized-light": {
    name: "Solarized Light",
    description: "Light variant of Solarized",
    primaryColor: "#268bd2",
    accentColor: "#2aa198",
    backgroundColor: "#fdf6e3",
    textColor: "#657b83",
  },
  "one-dark": {
    name: "One Dark Pro",
    description: "Atom's iconic One Dark theme",
    primaryColor: "#61afef",
    accentColor: "#c678dd",
    backgroundColor: "#282c34",
    textColor: "#abb2bf",
  },
  "tokyo-night": {
    name: "Tokyo Night",
    description: "Clean, dark theme inspired by Tokyo's night",
    primaryColor: "#7aa2f7",
    accentColor: "#bb9af7",
    backgroundColor: "#1a1b26",
    textColor: "#c0caf5",
  },
  "gruvbox-dark": {
    name: "Gruvbox Dark",
    description: "Retro groove color scheme",
    primaryColor: "#fe8019",
    accentColor: "#fabd2f",
    backgroundColor: "#282828",
    textColor: "#ebdbb2",
  },
  "gruvbox-light": {
    name: "Gruvbox Light",
    description: "Light variant of Gruvbox",
    primaryColor: "#af3a03",
    accentColor: "#b57614",
    backgroundColor: "#fbf1c7",
    textColor: "#3c3836",
  },
  "material-dark": {
    name: "Material Dark",
    description: "Google's Material Design dark theme",
    primaryColor: "#82aaff",
    accentColor: "#c792ea",
    backgroundColor: "#263238",
    textColor: "#eeffff",
  },
  "material-light": {
    name: "Material Light",
    description: "Google's Material Design light theme",
    primaryColor: "#0277bd",
    accentColor: "#7c4dff",
    backgroundColor: "#fafafa",
    textColor: "#263238",
  },
  "night-owl": {
    name: "Night Owl",
    description: "Theme for night owls",
    primaryColor: "#82aaff",
    accentColor: "#c792ea",
    backgroundColor: "#011627",
    textColor: "#d6deeb",
  },
  "ayu-dark": {
    name: "Ayu Dark",
    description: "Simple, bright and elegant theme",
    primaryColor: "#59c2ff",
    accentColor: "#ffb454",
    backgroundColor: "#0a0e14",
    textColor: "#b3b1ad",
  },
  "ayu-mirage": {
    name: "Ayu Mirage",
    description: "Balanced Ayu variant",
    primaryColor: "#5ccfe6",
    accentColor: "#ffd580",
    backgroundColor: "#1f2430",
    textColor: "#cbccc6",
  },
  cobalt2: {
    name: "Cobalt2",
    description: "Refined cobalt blue theme",
    primaryColor: "#ffc600",
    accentColor: "#ff9d00",
    backgroundColor: "#193549",
    textColor: "#ffffff",
  },
  "synthwave-84": {
    name: "Synthwave '84",
    description: "Retro 80s neon theme",
    primaryColor: "#ff7edb",
    accentColor: "#fe4450",
    backgroundColor: "#262335",
    textColor: "#ffffff",
  },
  palenight: {
    name: "Palenight",
    description: "Elegant dark purple theme",
    primaryColor: "#82aaff",
    accentColor: "#c792ea",
    backgroundColor: "#292d3e",
    textColor: "#a6accd",
  },
  "shades-of-purple": {
    name: "Shades of Purple",
    description: "Professional purple theme",
    primaryColor: "#fad000",
    accentColor: "#ff628c",
    backgroundColor: "#2d2b55",
    textColor: "#ffffff",
  },
  "oceanic-next": {
    name: "Oceanic Next",
    description: "Ocean-inspired color scheme",
    primaryColor: "#6699cc",
    accentColor: "#5fb3b3",
    backgroundColor: "#1b2b34",
    textColor: "#c0c5ce",
  },
  horizon: {
    name: "Horizon",
    description: "Warm, sunset-inspired theme",
    primaryColor: "#e95678",
    accentColor: "#fab795",
    backgroundColor: "#1c1e26",
    textColor: "#e3e6ee",
  },
  moonlight: {
    name: "Moonlight",
    description: "Dark blue theme with vibrant colors",
    primaryColor: "#82aaff",
    accentColor: "#c099ff",
    backgroundColor: "#212337",
    textColor: "#c8d3f5",
  },
  "catppuccin-mocha": {
    name: "Catppuccin Mocha",
    description: "Soothing pastel theme",
    primaryColor: "#89b4fa",
    accentColor: "#cba6f7",
    backgroundColor: "#1e1e2e",
    textColor: "#cdd6f4",
  },
  "rose-pine": {
    name: "Rosé Pine",
    description: "All natural pine, faux fur and a bit of soho vibes",
    primaryColor: "#ebbcba",
    accentColor: "#c4a7e7",
    backgroundColor: "#191724",
    textColor: "#e0def4",
  },
};

// Get theme preset by key
export function getThemePreset(presetKey) {
  return THEME_PRESETS[presetKey] || null;
}

// Get all theme presets as array
export function getAllThemePresets() {
  return Object.entries(THEME_PRESETS).map(([key, theme]) => ({
    key,
    ...theme,
  }));
}

// Apply theme preset to settings
export function applyThemePreset(presetKey, currentSettings) {
  const preset = getThemePreset(presetKey);
  if (!preset) return currentSettings;

  return {
    ...currentSettings,
    theme: {
      ...currentSettings.theme,
      enabled: true,
      primaryColor: preset.primaryColor,
      accentColor: preset.accentColor,
      backgroundColor: preset.backgroundColor,
      textColor: preset.textColor,
    },
  };
}
