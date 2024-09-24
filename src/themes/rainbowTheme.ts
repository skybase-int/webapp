import { lightTheme, Theme } from '@rainbow-me/rainbowkit';

export const rainbowTheme: Theme = {
  ...lightTheme(),
  radii: { ...lightTheme().radii, menuButton: '12px', connectButton: '12px' },
  colors: {
    ...lightTheme().colors,
    connectButtonBackground: 'rgb(97, 67, 246)',
    connectButtonText: 'white'
  },
  fonts: {
    body: 'CircularStd, sans-serif'
  }
};
