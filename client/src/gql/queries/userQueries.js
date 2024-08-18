import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users {
      firstName
      lastName
      email
      address
      phoneNumber
    }
  }
`;

export const GET_MY_TRANSACTIONS = gql`
  query GetMyTransactions {
    userTransactions {
      id
      type
      fromUser {
        id
      }
      toUser {
        id
      }
      product {
        id
        title
        categories
        purchasePrice
        description
        createdAt
      }
    }
  }
`;
