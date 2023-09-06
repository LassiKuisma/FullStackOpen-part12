import { Pressable, StyleSheet, View } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import { useApolloClient } from '@apollo/client';
import { useAuthStorage } from '../hooks/useAuthStorage';

import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textLight,
  },
  container: {
    padding: 10,
  },
});

const AppBarTab = ({ text, linkTo, type }) => {
  if (type === 'logout') {
    return <LogoutTab text={text} linkTo={linkTo} />;
  }

  return (
    <View style={styles.container}>
      <Link to={linkTo}>
        <Text fontSize="subheading" fontWeight="bold" style={styles.text}>
          {text}
        </Text>
      </Link>
    </View>
  );
};

const LogoutTab = ({ text, linkTo }) => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const onPress = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate(linkTo);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <Text fontSize="subheading" fontWeight="bold" style={styles.text}>
          {text}
        </Text>
      </Pressable>
    </View>
  );
};

export default AppBarTab;
