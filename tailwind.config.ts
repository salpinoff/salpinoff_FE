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
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents(typography);
    }, {}),
  ],
};
export default config;
