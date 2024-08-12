import { gql } from "@apollo/client";

export const CREATE_USER = () => {
    return gql`
      mutation CreateUser($createUserNameInput: CreateUserNameInput!) {
        createUser(createUserNameInput: $createUserNameInput) {
          id
          uid
          email
          firstName
          lastName
          picture
        }
      }
    `;
};

export const UPSERT_USER = () => {
    return gql`
      mutation CreateUser($createUserNameInput: CreateUserNameInput!) {
        upsertUser(createUserNameInput: $createUserNameInput) {
          id
          uid
          email
          firstName
          lastName
          picture
        }
      }
    `;
};
