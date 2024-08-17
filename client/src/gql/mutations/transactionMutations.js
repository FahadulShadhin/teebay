import { gql } from '@apollo/client';

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction(
    $type: TransactionType!
    $productId: Int!
    $rentStartDate: String
    $rentEndDate: String
  ) {
    createTransaction(
      type: $type
      productId: $productId
      rentStartDate: $rentStartDate
      rentEndDate: $rentEndDate
    ) {
      type
      fromUser {
        id
        email
        firstName
        lastName
      }
      toUser {
        id
        email
        firstName
        lastName
      }
      product {
        id
        title
      }
      rentStartDate
      rentEndDate
    }
  }
`;
