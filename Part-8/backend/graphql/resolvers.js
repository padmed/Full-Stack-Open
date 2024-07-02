const queries = require('./actions/queries')
const mutations = require('./actions/mutations')

const resolvers = {
    Query: {
      bookCount: queries.bookCount,
      authorCount: queries.authorCount,
      allBooks: queries.allBooks,
      allAuthors: queries.allAuthors,
    },
  
    Mutation: {
      addBook: mutations.addBook,
      editAuthor: mutations.editAuthor,
    },
  
    Author: {
      bookCount: queries.bookCountAuthor
    }
  }

  module.exports = resolvers