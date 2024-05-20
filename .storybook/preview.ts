import type { Preview } from '@storybook/react';

import '!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css';

import '../src/app/globals.css';
import '../build/css/_variables.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
