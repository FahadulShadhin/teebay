import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      title
      description
      categories
      purchasePrice
      rentPrice
      rentPriceType
      createdAt
    }
  }
`;

export const GET_MY_PRODUCTS = gql`
  query GetMyProducts {
    userProducts {
      id
      title
      description
      categories
      purchasePrice
      rentPrice
      rentPriceType
      createdAt
      user {
        email
      }
    }
  }
`;
