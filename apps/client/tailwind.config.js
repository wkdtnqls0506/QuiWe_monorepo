// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)']
      },
      colors: {
        boolean: {
          success: '#0CBC72',
          error: '#BD2222'
        },
        gray: {
          100: '#F2F2F2',
          200: '#F8F8F8',
          300: '#E6E6E6',
          400: '#DEDEDE',
          500: '#CCCCCC',
          600: '#9C9C9C',
          700: '#616161',
          800: '#3C3C3C',
          900: '#1A1A1A'
        },
        green: {
          100: '#E8F5E9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#4CAF50',
          600: '#43A047',
          700: '#388E3C',
          800: '#2E7D32'
        }
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out'
      }
    }
  },
  plugins: []
};
