import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    textLight: '#ffffff',
    primary: '#0366d6',
    appBar: '#24292e',
    background: '#e1e4e8',
    lightBackground: '#ffffff',
    error: '#d73a4a',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  icon: {
    size: 50,
  },
  spacing: {
    formMargin: 12,
    formPadding: 10,
  },
  rating: {
    size: 40,
    border: 3
  },
};

export default theme;
