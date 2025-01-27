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
        },
        secondary: {
          100: '#7DD2B2'
        },
        'gray': {
          100: '#666666'
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
