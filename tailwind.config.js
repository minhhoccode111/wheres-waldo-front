/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'semi-transparent': '#ffffffef',
        link: '#0ea5e9',
        danger: '#ef4444',
        warn: '#eab308',
        success: '#22c55e',
      },
      spacing: {
        wally: '42.5%',
      },
      aspectRatio: {
        '2/3': '2 / 3',
        '3/2': '3 / 2',
        '9/16': '9 / 16',
        '16/9': '16 / 9',
      },
    },
  },
};
