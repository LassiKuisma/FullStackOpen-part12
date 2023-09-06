import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepositoryDetails = (variables) => {
  const { data, error, loading, fetchMore, refetch } = useQuery(
    GET_REPOSITORY,
    {
      fetchPolicy: 'cache-and-network',
      variables,
    }
  );

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    refetch,
    error,
  };
};

export default useRepositoryDetails;
