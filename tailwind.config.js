/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js,md,mdx}"],
  theme: {
    extend: {
      screens: {
        '2xl': '1440px',// => @media (min-width: 1440px) { ... }
        
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
