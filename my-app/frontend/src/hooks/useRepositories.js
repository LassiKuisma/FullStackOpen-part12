import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (args) => {
  const orderBy = args?.orderBy || 'CREATED_AT';
  const orderDirection = args?.orderDirection || 'DESC';
  const keyword = args?.keyword || '';

  const variables = {
    orderBy,
    orderDirection,
    searchKeyword: keyword,
    ...args,
  };

  const { data, error, loading, fetchMore, refetch } = useQuery(
    GET_REPOSITORIES,
    {
      fetchPolicy: 'cache-and-network',
      variables,
    }
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    refetch,
    error,
  };
};

export default useRepositories;
