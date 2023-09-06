import { gql } from '@apollo/client';
import { REVIEW } from './fragments';

export const LOGIN = gql`
  mutation Login($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  ${REVIEW}
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      ...ReviewFields
      repositoryId
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      id
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($reviewId: ID!) {
    deleteReview(id: $reviewId)
  }
`;
