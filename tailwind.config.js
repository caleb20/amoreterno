/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🎨 Mantenemos los originales
        primary: {
          50: "#FEF7F3",
          100: "#FDE8E8",
          200: "#FBD5D5",
          300: "#F8BBD9", // Main primary - soft blush pink
          400: "#F5A3C7",
          500: "#F28BB5",
          600: "#EF73A3",
          700: "#EC5B91",
          800: "#E9437F",
          900: "#E62B6D",
          DEFAULT: "#F8BBD9",
        },
        secondary: {
          50: "#F7F9F5",
          100: "#EFF3EB",
          200: "#E7EDE1",
          300: "#DFE7D7",
          400: "#D7E1CD",
          500: "#CFDBC3",
          600: "#C7D5B9",
          700: "#BFCFAF",
          800: "#B8C5A6",
          900: "#A8B596",
          DEFAULT: "#B8C5A6",
        },
        accent: {
          50: "#FDF2F8",
          100: "#FCE7F3",
          200: "#FBCFE8",
          300: "#F9A8D4",
          400: "#F472B6",
          500: "#EC4899",
          600: "#D63384",
          700: "#BE185D",
          800: "#9D174D",
          900: "#831843",
          DEFAULT: "#D63384",
        },

        // 🆕 Alias para compatibilidad con componentes
        'text-primary': '#2D3748',
        'text-secondary': '#718096',
        'text-muted': '#A0AEC0',
        'text-light': '#CBD5E0',
        'background': '#FFF8F5',
        'surface': '#FFFFFF',
        'surface-100': '#FDE8E8',
        'surface-200': '#FBD5D5',
        'border': '#E2E8F0',
        'border-light': '#FDE8E8',
        'border-dark': '#FBD5D5',
        'accent-50': '#FDF2F8',
        'accent-100': '#FCE7F3',
        'accent-500': '#EC4899',
        'accent-600': '#D63384',
        'accent-700': '#BE185D',
        'error': '#E53E3E',
        'error-600': '#C2185B',
        'success': '#38A169',
        'success-600': '#2F855A',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      boxShadow: {
        'primary': '0 4px 12px rgba(248, 187, 217, 0.15)',
        'primary-lg': '0 6px 16px rgba(248, 187, 217, 0.2)',
        'accent': '0 8px 24px rgba(214, 51, 132, 0.2)',
        'accent-lg': '0 12px 32px rgba(214, 51, 132, 0.3)',
        'cta': '0 10px 15px -3px rgba(233, 30, 99, 0.2)',
        'cta-hover': '0 15px 20px -3px rgba(233, 30, 99, 0.3)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
      transitionDuration: {
        '150': '150ms',
        '250': '250ms',
      },
      transitionTimingFunction: {
        'in-out': 'ease-in-out',
      },
      animation: {
        'bounce-subtle': 'bounce-subtle 0.3s ease-in-out',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
      },
      keyframes: {
        'bounce-subtle': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slideDown': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slideUp': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slideRight': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '250': '250',
        '300': '300',
      },
      backdropBlur: {
        'header': '8px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require("tailwindcss-animate"),
  ],
};
