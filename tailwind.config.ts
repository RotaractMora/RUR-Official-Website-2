const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const svgToDataUri = require("mini-svg-data-uri");
 
const colors = require("tailwindcss/colors");


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
        'dark-gradient': 'linear-gradient(75deg, rgba(0,8,21,1) 0%, rgba(0,19,30,1) 30%, rgba(3,49,62,1) 45%, rgba(0,16,41,1) 60%, rgba(0,5,40,1) 100%)',
        'light-gradient': ' linear-gradient(55deg, rgba(151,219,245,1) 0%, rgba(255,255,255,1) 30%, rgba(243,253,255,1) 45%, rgba(255,255,255,1) 60%, rgba(156,225,251,1) 100%)',
        
      },
      colors:{
        'custom-dark-color-950': '#0C0C0C',
        'custom-dark-color-900': '#1A1A1A',
        'custom-dark-color-800': '#282828',
        'custom-dark-color-700': '#464646',
        'custom-dark-color-600': '#646464',
        'custom-dark-color-500': '#828282',
        'custom-dark-color-400': '#A0A0A0',
        'custom-dark-color-300': '#BEBEBE',
        'custom-dark-color-200': '#DCDCDC',
        'custom-dark-color-100': '#FCFCFC',
        'custom-color-950': '#FFFFFF',
        'custom-color-900': '#E5E7EB',
        'custom-color-800': '#D1D5DB',
        'custom-color-700': '#9CA3AF',
        'custom-color-600': '#6B7280',
        'custom-color-500': '#4B5563',
        'custom-color-400': '#374151',
        'custom-color-300': '#1F2937',
        'custom-color-200': '#111827',
        'custom-color-100': '#0C0C0C',
      }
    },
    animation: {
      flip: 'flip 1s ease-in-out',
      shimmer: "shimmer 2s linear infinite",
    },
    keyframes: {
      shimmer: {
        '0%': {
          backgroundPosition: "0 0",
        },
        '100%': {
          backgroundPosition: "-200% 0",
        },
      },
      flip: {
        '0%': { transform: 'rotateX(0deg)' },
        '100%': { transform: 'rotateX(360deg)' },
      },
    },
  },
  plugins: [addVariablesForColors,

    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-grid": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },

  ],
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


