/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        'purple': {
          50: '#faf5ff',
          600: '#9333ea',
          700: '#7e22ce',
        },
        'pink': {
          50: '#fce7f3',
          600: '#db2777',
        },
        // Strategy Colors
        'strategy-hot': '#ef4444',
        'strategy-cold': '#3b82f6',
        'strategy-balanced': '#10b981',
        'strategy-oddeven': '#a855f7',
        'strategy-high': '#eab308',
        'strategy-random': '#6b7280',
        // Lotto Ball Colors
        'ball-1-10': '#facc15',
        'ball-11-20': '#60a5fa',
        'ball-21-30': '#f87171',
        'ball-31-40': '#4b5563',
        'ball-41-45': '#10b981',
      },
      fontFamily: {
        'primary': [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif'
        ],
      },
      backgroundImage: {
        'main': 'linear-gradient(to bottom right, #e0e7ff, #fce7f3, #fce7f3)',
        'premium': 'linear-gradient(135deg, #9333ea, #db2777)',
        'winner': 'linear-gradient(90deg, #fbbf24, #f97316)',
      },
      animation: {
        'pulse': 'pulse 2s infinite',
      },
    },
  },
  plugins: [],
}