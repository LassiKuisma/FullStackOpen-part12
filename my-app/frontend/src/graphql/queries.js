import { gql } from '@apollo/client';
import { REPOSITORY_INFO, REVIEW } from './fragments';

export const GET_REPOSITORIES = gql`
  ${REPOSITORY_INFO}
  query GetRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      totalCount
      edges {
        node {
          ...RepositoryInfo
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const CURRENT_USER = gql`
  ${REVIEW}
  query CurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewFields
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  ${REPOSITORY_INFO}
  ${REVIEW}
  query RepositoryInfo($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RepositoryInfo
      url
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          node {
            ...ReviewFields
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;
