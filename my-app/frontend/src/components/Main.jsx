import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';

import theme from '../theme';
import SingleRepositoryView from './SingleRepositoryView';
import Review from './Review';
import CreateAccount from './CreateAccount';
import UserReviews from './UserReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.background,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/login" element={<SignIn />} />
        <Route
          path="/repository/:repositoryId"
          element={<SingleRepositoryView />}
        />
        <Route path="/signup" element={<CreateAccount />} />
        <Route path="/review" element={<Review />} />
        <Route path="/myreviews" element={<UserReviews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
