import plugin from 'tailwindcss/plugin';

import type { Config } from 'tailwindcss';

import {
  colors,
  spacing,
  boxShadow,
  borderRadius,
  typography,
} from './tokens/parsed-tokens';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    {
      pattern: /-*-(bold|semibold|medium|regular)/,
    },
  ],
  theme: {
    extend: {
      colors: Object.assign(colors, {}),
      spacing,
      boxShadow,
      borderRadius,
      fontFamily: {
        sans: ['var(--font-pretendard)', 'var(--font-family-sans)'],
        pretendard: 'var(--font-pretendard)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translate3d(0, 100%, 0)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
          },
        },
        'fade-in-down': {
          '0%': {
            opacity: '1',
            transform: 'translate3d(0, 0%, 0)',
          },
          '100%': {
            opacity: '0',
            transform: 'translate3d(0, 100, 0)',
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 300ms ease-in-out 1',
        enter: 'fade-in-up 300ms ease-in-out 1',
        leave: 'fade-in-down 300ms ease-in forwards',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('tailwind-scrollbar-hide'),
    plugin(({ addComponents }) => {
      addComponents(typography);
    }, {}),
    plugin(({ addVariant }) => {
      addVariant('webkit-slider', '&::-webkit-slider-thumb');
      addVariant('moz-slider', '&::-moz-range-thumb');
      addVariant('ms-slider', '&::-ms-thumb');
    }),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.appearance-none': {
          appearance: 'none',
          '-webkit-appearance': 'none',
          '-moz-appearance': 'none',
        },
        '.webkit-appearance-none': {
          '-webkit-appearance': 'none',
        },
      });
    }),
  ],
};
export default config;
