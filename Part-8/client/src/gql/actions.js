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
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      author {
        name
        id
        bookCount
        born
      }
      published
      title
      id
      genres
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
      author {
        name
        id
        bookCount
        born
      }
      genres
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: String!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      id
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const CURRENT_USER = gql`
  query {
    me {
      username
      id
      favoriteGenre
    }
  }
`;

export const GET_GENRES = gql`
  query {
    allBooks {
      genres
    }
  }
`;
