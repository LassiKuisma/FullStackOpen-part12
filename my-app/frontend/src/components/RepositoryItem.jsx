import { Image, Pressable, StyleSheet, View } from 'react-native';

import * as Linking from 'expo-linking';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.lightBackground,
  },
  logo: {
    width: theme.icon.size,
    height: theme.icon.size,
    borderRadius: 5,
    marginRight: 10,
  },
  cell: {
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    gap: 5,
  },
  info: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
  },
  language: {
    color: theme.colors.textLight,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  urlContainer: {
    margin: 10,
    maxWidth: 400,
  },
  urlButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 15,
  },
});

const RepositoryItem = (props) => {
  const item = props.item;

  const displayLink = props.displayLink;

  return (
    <View style={styles.container} testID="repositoryItem">
      <BasicInfo item={item} />
      <RepositoryStats item={item} />
      {displayLink && <LinkToGithub url={item.url} />}
    </View>
  );
};

const BasicInfo = ({ item }) => {
  return (
    <View style={styles.info}>
      <Image
        style={styles.logo}
        source={{ uri: item.ownerAvatarUrl }}
        alt="user avatar"
      />
      <View style={{ alignItems: 'flex-start' }}>
        <Text fontWeight="bold" fontSize="subheading">
          {item.fullName}
        </Text>
        <Text>{item.description}</Text>
        <Text fontWeight="bold" style={styles.language}>
          {item.language}
        </Text>
      </View>
    </View>
  );
};

const RepositoryStats = ({ item }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <StatsCell title={'Stars'} value={item.stargazersCount} />
      <StatsCell title={'Forks'} value={item.forksCount} />
      <StatsCell title={'Reviews'} value={item.reviewCount} />
      <StatsCell title={'Rating'} value={item.ratingAverage} />
    </View>
  );
};

const StatsCell = ({ title, value }) => {
  const valueWithSuffix =
    value >= 1000
      ? (value / 1000).toFixed(1).toString() + 'k'
      : value.toString();

  return (
    <View style={styles.cell}>
      <Text fontWeight="bold">{valueWithSuffix}</Text>
      <Text>{title}</Text>
    </View>
  );
};

const LinkToGithub = ({ url }) => {
  const onPress = () => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.urlContainer}>
      <Pressable onPress={onPress} style={styles.urlButton}>
        <Text fontWeight="bold" fontSize="subheading" color="light">
          Open in GitHub
        </Text>
      </Pressable>
    </View>
  );
};

export default RepositoryItem;
