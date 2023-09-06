import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import useCurrentUser from '../hooks/useCurrentUser';

import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const { loading, user } = useCurrentUser();

  const loggedIn = !!user;
  const displayLogin = !loading && !loggedIn;
  const displayLogout = !loading && loggedIn;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" linkTo="/" />
        {displayLogin && (
          <>
            <AppBarTab text="Sign in" linkTo="/login" />
            <AppBarTab text="Sign up" linkTo="/signup" />
          </>
        )}
        {displayLogout && (
          <>
            <AppBarTab text="Create a review" linkTo="/review" />
            <AppBarTab text="My reviews" linkTo="/myreviews" />
            <AppBarTab type="logout" text="Sign out" linkTo="/" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
