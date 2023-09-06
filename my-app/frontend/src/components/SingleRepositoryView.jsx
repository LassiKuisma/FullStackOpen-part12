import { FlatList, View, StyleSheet } from 'react-native';

import useRepositoryDetails from '../hooks/useRepositoryDetails';
import { useParams } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import Text from './Text';

const styles = StyleSheet.create({
  header: {
    paddingBottom: 10,
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepositoryView = () => {
  const { repositoryId } = useParams();
  const { repository, loading, fetchMore } = useRepositoryDetails({
    id: repositoryId,
    first: 5,
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!repository) {
    return null;
  }

  const onEndReach = () => {
    fetchMore();
  };

  const reviews = repository.reviews.edges.map((n) => n.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <RepositoryItem item={repository} displayLink={true} />
      )}
      ListHeaderComponentStyle={styles.header}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepositoryView;
