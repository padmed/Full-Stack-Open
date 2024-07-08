import { gql } from "@apollo/client";

export const GET_ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

export const GET_ALL_BOOKS = gql`
  query {
    allBooks {
      author
      published
      title
      id
    }
  }
`;

export const ADD_NEW_BOOK = gql`
  mutation addNewBook(
    $title: String!
    $published: String!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      id
      published
      author
      genres
    }
  }
`;
