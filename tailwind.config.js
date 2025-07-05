/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🎨 Nueva Paleta Centralizada - Amor Eterno
        primary: {
          50: "#FFF3F8",   // rosa muy claro
          100: "#FFE6F2",  // rosa claro
          200: "#FFCCEB",  // rosa medio claro
          300: "#FFB3DD",  // rosa medio
          400: "#FF99C8",  // rosa principal (tu color)
          500: "#FF80B8",  // rosa vibrante
          600: "#E6739F",  // rosa oscuro
          700: "#CC6685",  // rosa más oscuro
          800: "#B3596C",  // rosa muy oscuro
          900: "#994C52",  // rosa profundo
          DEFAULT: "#FF99C8", // tu rosa principal
        },
        secondary: {
          50: "#F0FAFF",   // celeste muy claro
          100: "#E1F5FF",  // celeste claro
          200: "#C3EBFF",  // celeste medio claro
          300: "#A9DEF9",  // celeste principal (tu color)
          400: "#8FD1F3",  // celeste vibrante
          500: "#75C4ED",  // celeste medio
          600: "#66B1D4",  // celeste oscuro
          700: "#579EBB",  // celeste más oscuro
          800: "#488BA2",  // celeste muy oscuro
          900: "#397889",  // celeste profundo
          DEFAULT: "#A9DEF9", // tu celeste principal
        },
        accent: {
          50: "#FAF5FF",   // lavanda muy claro
          100: "#F5EBFF",  // lavanda claro
          200: "#EBD7FF",  // lavanda medio claro
          300: "#E4C1F9",  // lavanda principal (tu color)
          400: "#DDABF6",  // lavanda vibrante
          500: "#D695F3",  // lavanda medio
          600: "#C186DA",  // lavanda oscuro
          700: "#AC77C1",  // lavanda más oscuro
          800: "#9768A8",  // lavanda muy oscuro
          900: "#82598F",  // lavanda profundo
          DEFAULT: "#E4C1F9", // tu lavanda principal
        },
        background: {
          50: "#FFFEF9",   // amarillo muy claro
          100: "#FEFDEB",  // amarillo claro
          200: "#FDFBDE",  // amarillo medio claro
          300: "#FCF6BD",  // amarillo principal (tu color)
          400: "#FBF29B",  // amarillo vibrante
          500: "#FAEE7A",  // amarillo medio
          600: "#E1D56E",  // amarillo oscuro
          700: "#C8BC62",  // amarillo más oscuro
          800: "#AFA356",  // amarillo muy oscuro
          900: "#968A4A",  // amarillo profundo
          DEFAULT: "#FCF6BD", // tu amarillo principal
        },
        mint: {
          50: "#F7FEF9",   // verde menta muy claro
          100: "#EFFDF3",  // verde menta claro
          200: "#E7FCE7",  // verde menta medio claro
          300: "#D0F4DE",  // verde menta principal (tu color)
          400: "#B9ECD5",  // verde menta vibrante
          500: "#A2E4CC",  // verde menta medio
          600: "#92CDB7",  // verde menta oscuro
          700: "#82B6A2",  // verde menta más oscuro
          800: "#729F8D",  // verde menta muy oscuro
          900: "#628878",  // verde menta profundo
          DEFAULT: "#D0F4DE", // tu verde menta principal
        },

        // Colores complementarios mantenidos
        success: "#D0F4DE",  // usando tu verde menta
        warning: "#FCF6BD",   // usando tu amarillo
        error: "#FF6B9D",     // derivado de tu rosa
        info: "#A9DEF9",      // usando tu celeste
        
        // Colores de texto
        'text-primary': '#1A202C',
        'text-secondary': '#4A5568',
        'text-muted': '#718096',
        'text-light': '#A0AEC0',
        
        // Colores de superficie
        'surface': '#FFFFFF',
        'surface-50': '#FFFEF9',
        'surface-100': '#FCF6BD',
        'surface-200': '#A9DEF9',
        
        // Bordes
        'border': '#E2E8F0',
        'border-light': '#F7FAFC',
        'border-accent': '#E4C1F9',
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
        'primary': '0 4px 12px rgba(255, 153, 200, 0.15)',      // usando tu rosa
        'primary-lg': '0 6px 16px rgba(255, 153, 200, 0.2)',   // usando tu rosa
        'accent': '0 8px 24px rgba(228, 193, 249, 0.2)',       // usando tu lavanda
        'accent-lg': '0 12px 32px rgba(228, 193, 249, 0.3)',   // usando tu lavanda
        'secondary': '0 6px 16px rgba(169, 222, 249, 0.15)',   // usando tu celeste
        'mint': '0 4px 12px rgba(208, 244, 222, 0.2)',         // usando tu verde menta
        'background': '0 2px 8px rgba(252, 246, 189, 0.1)',    // usando tu amarillo
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
