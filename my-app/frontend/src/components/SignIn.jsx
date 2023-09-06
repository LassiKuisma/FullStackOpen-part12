import { Pressable, View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Formik } from 'formik';

import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';

import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.lightBackground,
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    height: 40,
    margin: theme.spacing.formMargin,
    padding: theme.spacing.formPadding,
    borderRadius: 5,
  },
  loginButtonText: {
    color: theme.colors.textLight,
    textAlign: 'center',
  },
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be at least 5 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Pressable onPress={onSubmit} style={styles.loginButton}>
        <Text
          fontWeight="bold"
          fontSize="subheading"
          style={styles.loginButtonText}
        >
          Login
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
