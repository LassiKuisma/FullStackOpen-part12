import { gql } from '@apollo/client';

export const REPOSITORY_INFO = gql`
  fragment RepositoryInfo on Repository {
    id
    fullName
    ownerAvatarUrl
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
  }
`;

export const REVIEW = gql`
  fragment ReviewFields on Review {
    id
    text
    rating
    createdAt
    repository {
      id
      fullName
    }
    user {
      id
      username
    }
  }
`;
