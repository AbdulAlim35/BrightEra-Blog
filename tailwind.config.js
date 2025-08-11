import lineClamp from '@tailwindcss/line-clamp'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
       // Custom scrollbar utilities
      scrollbar: ['rounded'],
    },
  },
  plugins: [
    lineClamp,
    require('tailwind-scrollbar'),
  ],
};
