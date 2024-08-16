import { gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $title: String!
    $description: String!
    $categories: [Category!]!
    $purchasePrice: Float!
    $rentPrice: Float!
    $rentPriceType: RentPriceType!
  ) {
    createProduct(
      title: $title
      description: $description
      categories: $categories
      purchasePrice: $purchasePrice
      rentPrice: $rentPrice
      rentPriceType: $rentPriceType
    ) {
      title
      description
      categories
      purchasePrice
      rentPrice
      rentPriceType
      user {
        email
      }
    }
  }
`;
