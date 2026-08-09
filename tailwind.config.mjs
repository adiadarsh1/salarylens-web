/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B1220',
        paper: '#F7F9FC',
        brand: {
          50: '#eef7f1',
          100: '#d4ecdc',
          500: '#16a34a',
          600: '#15803d',
          700: '#166534',
        },
        accent: '#2563eb',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,24,40,0.04), 0 8px 24px rgba(16,24,40,0.06)',
      },
    },
  },
  plugins: [],
};
