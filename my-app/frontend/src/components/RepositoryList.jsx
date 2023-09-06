import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';

import { useDebounce } from 'use-debounce';
import React, { useState } from 'react';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    padding: 10,
    margin: 10,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
  },
  keywordFilter: {
    placeholderTextColor: theme.colors.textSecondary,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const orderingTypes = {
  latestFirst: {
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  },
  bestFirst: {
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
  },
  worstFirst: {
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
  },
};

const OrderingPicker = ({ ordering, setOrdering }) => {
  return (
    <Picker
      style={styles.picker}
      selectedValue={ordering}
      onValueChange={(itemValue) => setOrdering(itemValue)}
    >
      <Picker.Item label="Latest repositories" value="latestFirst" />
      <Picker.Item label="Highest rated repositories" value="bestFirst" />
      <Picker.Item label="Lowest rated repositories" value="worstFirst" />
    </Picker>
  );
};

const KeywordFilter = ({ keyword, setKeyword }) => {
  return (
    <TextInput
      style={styles.keywordFilter}
      placeholder="Filter by keyword"
      value={keyword}
      onChangeText={(value) => setKeyword(value)}
    />
  );
};

const RepositoryListHeader = ({
  ordering,
  setOrdering,
  keyword,
  setKeyword,
}) => {
  return (
    <View>
      <KeywordFilter keyword={keyword} setKeyword={setKeyword} />
      <OrderingPicker ordering={ordering} setOrdering={setOrdering} />
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  onPress,
  ordering,
  setOrdering,
  keyword,
  setKeyword,
  onEndReach,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <RepositoryListHeader
          ordering={ordering}
          setOrdering={setOrdering}
          keyword={keyword}
          setKeyword={setKeyword}
        />
      }
      renderItem={({ item }) => (
        <Pressable onPress={() => onPress(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [ordering, setOrdering] = useState('latestFirst');
  const [keyword, setKeyword] = useState('');
  const [debounced] = useDebounce(keyword, 500);

  const args = {
    keyword: debounced,
    first: 8,
    ...orderingTypes[ordering],
  };
  const { repositories, fetchMore } = useRepositories(args);
  const navigate = useNavigate();

  const onPress = (id) => {
    navigate(`/repository/${id}`);
  };

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onPress={onPress}
      ordering={ordering}
      setOrdering={setOrdering}
      keyword={keyword}
      setKeyword={setKeyword}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
