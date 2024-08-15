import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup(
    $firstName: String!
    $lastName: String!
    $email: String!
    $address: String!
    $phoneNumber: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signup(
      firstName: $firstName
      lastName: $lastName
      email: $email
      address: $address
      phoneNumber: $phoneNumber
      password: $password
      confirmPassword: $confirmPassword
    ) {
      token
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;
