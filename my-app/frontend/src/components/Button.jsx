import { StyleSheet, Pressable } from 'react-native';

import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  buttonDefault: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
  buttonRed: {
    backgroundColor: theme.colors.error,
  },
  buttonText: {
    color: theme.colors.textLight,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 10,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
});

const Button = ({ onSubmit, text, style, color }) => {
  const buttonStyle = [
    styles.buttonDefault,
    color === 'red' && styles.buttonRed,
    style,
  ];

  return (
    <Pressable onPress={onSubmit} style={buttonStyle}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

export default Button;
