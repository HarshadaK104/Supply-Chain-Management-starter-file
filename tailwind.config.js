/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit', 
    content: [
      "./app/**/*.{js,ts,tsx,mdx,jsx}",
      "./pages/**/*.{js,ts,tsx,mdx,jsx}",
      "./components/**/*.{js,ts,tsx,mdx,jsx}",
   
      // Or if using `src` directory:
      "./src/**/*.{js,ts,tsx,mdx,jsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
    variants: {}, 
  }