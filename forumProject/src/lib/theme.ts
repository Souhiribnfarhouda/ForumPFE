import { Button } from '@/components/button/Button';
import { extendTheme } from '@chakra-ui/react';
//  2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    100: '#FF3c00',
  },
  fonts: {
    body: 'Open Sans,sans-serif',
  },
  styles: {
    global: () => ({
      body: {
        bg: 'gray.200',
      },
    }),
  },
  components: {
    Button,
  },
};

export const theme = extendTheme({ colors });
