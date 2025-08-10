import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Dark Punk Theme Colors
        'punk-dark': '#0a0a0a',
        'punk-darker': '#050505',
        'punk-gray': '#1a1a1a',
        'punk-gray-light': '#2a2a2a',
        'punk-purple': '#a855f7',
        'punk-purple-glow': '#9333ea',
        'punk-green': '#00ff88',
        'punk-green-glow': '#00cc6a',
        'punk-blue': '#00d4ff',
        'punk-blue-glow': '#0099cc',
        'punk-pink': '#ff0080',
        'punk-pink-glow': '#cc0066',
        'punk-orange': '#ff6600',
        'punk-yellow': '#ffff00',
        'punk-red': '#ff0040',
      },
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
        'mono-cyber': ['Fira Code', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glitch': 'glitch 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
        'flicker': 'flicker 0.15s infinite linear',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        glow: {
          'from': { 
            textShadow: '0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor',
            filter: 'brightness(1)',
          },
          'to': { 
            textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
            filter: 'brightness(1.2)',
          },
        },
        'pulse-neon': {
          '0%, 100%': { 
            boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
          },
          '50%': { 
            boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
          },
        },
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter: 'brightness(1)',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'brightness(0.4)',
          },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(168,85,247,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.1) 1px, transparent 1px)',
        'cyber-gradient': 'linear-gradient(135deg, rgba(168,85,247,0.3) 0%, rgba(0,255,136,0.3) 50%, rgba(0,212,255,0.3) 100%)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
};

export default config;

