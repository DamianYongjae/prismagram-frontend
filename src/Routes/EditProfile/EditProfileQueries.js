import { gql } from "apollo-boost";

export const ME_QUERY = gql`
  {
    me {
      avatar
      username
      fullName
      email
      lastName
      firstName
      bio
    }
  }
`;

export const EDIT_PROFILE = gql`
  mutation editUser(
    $username: String
    $email: String
    $firstName: String
    $lastName: String
    $bio: String
    $avatar: String
  ) {
    editUser(
      username: $username
      email: $email
      firstName: $firstName
      lastName: $lastName
      bio: $bio
      avatar: $avatar
    ) {
      username
    }
  }
`;
