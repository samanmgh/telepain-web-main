import type {Config} from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "custom-header": "0 4px 24px 0px #0000000D",
        "custom-dropdown": "0 4px 4px 0px #0000000D"
      },
      screens: {
        'sm': '480px',
        'md': '768px',
        'lg': '976px',
        'xl': '1180px',
        '2xl': '1280px',
      },
      colors: {
        'primary': {
          100: '#283F63',
          200: '#1678F2',
          300: '#3A8EF6',
          400: '#6F3AFA',
          500: '#F2F7FF',
          600: '#65A8FB'
        },
        secondary: {
          100: '#7DD2B2',
          200: '#00BFA5'
        },
        'gray': {
          100: '#666666',
          200: '#6C87AE'
        }
      },
      backgroundImage: {
        'auth-pattern': "url('/auth-pattern.png')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
export default config;
