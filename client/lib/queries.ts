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
    mutation UpsertUser($upsertUserInput: UpsertUserInput!) {
      upsertUser(upsertUserInput: $upsertUserInput) {
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

export const UPDATE_USER = () => {
  return gql`
    mutation UpdateUser($updateUserInput: UpdateUserInput!) {
      updateUser(updateUserInput: $updateUserInput) {
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
