import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({
    repositoryOwner,
    repositoryName,
    rating,
    reviewText,
  }) => {
    const { data } = await mutate({
      variables: {
        review: {
          ownerName: repositoryOwner,
          repositoryName: repositoryName,
          rating,
          text: reviewText,
        },
      },
    });

    return { data };
  };

  return [createReview, result];
};

export default useReview;
