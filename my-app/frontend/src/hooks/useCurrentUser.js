import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../graphql/queries';

const useCurrentUser = (args) => {
  const includeReviews = args?.includeReviews || false;

  const { data, error, loading, refetch } = useQuery(CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
    variables: {
      includeReviews,
    },
  });

  return {
    user: data?.me,
    loading,
    refetch,
    error,
  };
};

export default useCurrentUser;
