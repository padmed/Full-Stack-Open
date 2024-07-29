const typeDefs = `

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: String
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: String!
      author: String!
      genres: [String!]!
      ) : Book!

    editAuthor(
      name: String!
      setBornTo: String!
      ) : Author

    createUser(
    username: String!
    favoriteGenre: String!
    ) : User

    login(username: String!
    password: String!
    ) : Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;
module.exports = typeDefs;
