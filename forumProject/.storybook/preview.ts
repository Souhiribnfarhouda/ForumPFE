import type { Preview } from '@storybook/react';
import { theme } from '../src/lib/theme';
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    // controls:{expanded:true},
    chakra: {
      theme,
    },
  },
};

export default preview;
