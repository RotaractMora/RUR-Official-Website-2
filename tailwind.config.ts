const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage:{
        'dark-gradient': 'linear-gradient(55deg, rgba(0,18,55,1) 0%, rgba(0,29,68,1) 30%, rgba(9,59,126,1) 45%, rgba(0,26,79,1) 60%, rgba(0,12,66,1) 100%)',
        'light-gradient': ' linear-gradient(55deg, rgba(151,219,245,1) 0%, rgba(255,255,255,1) 30%, rgba(243,253,255,1) 45%, rgba(255,255,255,1) 60%, rgba(156,225,251,1) 100%)',
      }
    },
  },
  plugins: [addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
