const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const svgToDataUri = require("mini-svg-data-uri");

const colors = require("tailwindcss/colors");
const tailwindcssAnimate = require("tailwindcss-animate")

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
  safelist: [
    'text-custom-color-gold',
    'text-custom-color-silver',
    'text-custom-color-bronze',
  ],
  theme: {
    screens: {
      'sm1': '570px',
      'sm2': '700px',
      'md': '768px',
      'lg': '1024px',
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-lato)", "sans-serif"],
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(75deg, rgba(0,8,21,1) 0%, rgba(0,19,30,1) 30%, rgba(3,49,62,1) 45%, rgba(0,16,41,1) 60%, rgba(0,5,40,1) 100%)',
        'light-gradient': 'linear-gradient(55deg, rgba(247,254,255,1) 0%, rgba(230,238,238,1) 20%, rgba(255,255,255,1) 45%, rgba(230,238,238,1) 70%, rgba(247,254,255,1) 100%);',
        'brand-gradient': 'linear-gradient(135deg, #0E0474 0%, #0147AF 30%, #14B2FA 100%)',
      },
      boxShadow: {
        input: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        'brand-blue': '#1E22A4',
        'brand-navy': '#0E0474',
        'brand-cyan': '#14B2FA',
      },
      // the animation and keyframes objects were previously overriding instead of extending. 
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

    tailwindcssAnimate,
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


