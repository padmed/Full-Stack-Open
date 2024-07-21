const queries = require("./actions/queries");
const mutations = require("./actions/mutations");

const resolvers = {
  Query: {
    bookCount: queries.bookCount,
    authorCount: queries.authorCount,
    allBooks: queries.allBooks,
    allAuthors: queries.allAuthors,
    me: queries.me,
  },

  Mutation: {
    addBook: mutations.addBook,
    editAuthor: mutations.editAuthor,
    createUser: mutations.createUser,
    login: mutations.login,
  },

  Author: {
    bookCount: queries.bookCountAuthor,
  },
};

module.exports = resolvers;
