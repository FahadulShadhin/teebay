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

export const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($id: Int!) {
    product(id: $id) {
      id
      title
      description
      categories
      purchasePrice
      rentPrice
      rentPriceType
      user {
        id
        firstName
        lastName
      }
    }
  }
`;
