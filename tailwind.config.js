const { dark } = require("@mui/material/styles/createPalette");

module.exports = {
  mode:'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-down': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      animation: {
        'slide-down': 'slide-down 0.3s ease-in-out',
      },
      colors: {
        gold: "#D8B266",
        black: "#000",
        white: "#fff",
        brand: "rgba(246, 206, 62, 1)",
        brandD: "#183136",
        bck: "#eee",
        primary: "#C5A700",
        dark: "#333",
        text: '#7F8087',
      },
    },
    screens: {
      sm: '640px', // Small devices
      md: '768px', // Medium devices
      lg: '1024px', // Large devices
      xl: '1280px', // Extra large devices
    },
  },
  plugins: [],
};
