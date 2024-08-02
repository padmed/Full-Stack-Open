const queries = require("./actions/queries");
const mutations = require("./actions/mutations");
const subscriptions = require("./actions/subscriptions");

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

  Subscription: {
    bookAdded: {
      subscribe: () => subscriptions.bookAdded(),
    },
  },
};

module.exports = resolvers;
