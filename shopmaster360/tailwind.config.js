/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Ensures Tailwind scans your files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF7F50", // Orange theme color
        bgPrimary: "#FF7F50",
      },
    },
  },
  plugins: [],
};

export default config;
