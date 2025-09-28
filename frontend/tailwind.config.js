/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',  // Extra small devices
        '2xl': '1400px', // Extra large devices
        '3xl': '1600px', // Ultra wide screens
      },
      colors: {
        primary: {
          50: '#f8f7f4',
          100: '#efede4',
          200: '#ddd8c8',
          300: '#c6bda4',
          400: '#b4a280',
          500: '#a28d68',
          600: '#8b7558',
          700: '#735f4a',
          800: '#5f4f40',
          900: '#4f4136',
        },
        accent: {
          50: '#fdf8f3',
          100: '#faeee1',
          200: '#f3dac2',
          300: '#e9c098',
          400: '#dda06c',
          500: '#d4824b',
          600: '#c66a40',
          700: '#a55537',
          800: '#854533',
          900: '#6c392c',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float-slow': 'floatSlow 20s ease-in-out infinite',
        'float-delayed': 'floatDelayed 12s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spinReverse 15s linear infinite',
        'blob-slow': 'blobSlow 25s ease-in-out infinite',
        'blob-medium': 'blobMedium 18s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg) scale(1)' },
          '25%': { transform: 'translateY(-20px) translateX(15px) rotate(2deg) scale(1.05)' },
          '50%': { transform: 'translateY(-30px) translateX(0px) rotate(0deg) scale(1.1)' },
          '75%': { transform: 'translateY(-15px) translateX(-15px) rotate(-2deg) scale(1.05)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg) scale(1)' },
          '20%': { transform: 'translateY(-40px) translateX(25px) rotate(3deg) scale(1.08)' },
          '40%': { transform: 'translateY(-20px) translateX(40px) rotate(5deg) scale(1.15)' },
          '60%': { transform: 'translateY(-35px) translateX(10px) rotate(2deg) scale(1.1)' },
          '80%': { transform: 'translateY(-15px) translateX(-20px) rotate(-3deg) scale(1.05)' },
        },
        floatDelayed: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) scale(1) rotate(0deg)' },
          '33%': { transform: 'translateY(-25px) translateX(-20px) scale(1.12) rotate(-4deg)' },
          '66%': { transform: 'translateY(-40px) translateX(30px) scale(1.08) rotate(3deg)' },
        },
        blobSlow: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg) scale(1)' },
          '25%': { transform: 'translateY(-50px) translateX(30px) rotate(5deg) scale(1.2)' },
          '50%': { transform: 'translateY(-30px) translateX(-40px) rotate(-3deg) scale(0.9)' },
          '75%': { transform: 'translateY(-60px) translateX(20px) rotate(7deg) scale(1.1)' },
        },
        blobMedium: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg) scale(1)' },
          '30%': { transform: 'translateY(-35px) translateX(-25px) rotate(-4deg) scale(1.15)' },
          '70%': { transform: 'translateY(-45px) translateX(35px) rotate(6deg) scale(0.95)' },
        },
        spinReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        }
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}