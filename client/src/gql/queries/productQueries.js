import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      title
      description
      user {
        email
      }
    }
  }
`;
