const books = require('../../data/books')
const authors = require('../../data/authors')

const bookCount = () =>  books.length
const authorCount = () => authors.length
const allBooks = (root, args) => {
    if (!args.author && !args.genre) {
      return books
    }


  const filteredBooks = books.filter((book) => {
    const checkAuthor = args.author === book.author
    const checkGenre = book.genres.includes(args.genre)

    if (args.author && args.genre) {
      return checkAuthor && checkGenre
    } else if (args.author) {
      return checkAuthor
    } else if (args.genre) {
      return checkGenre
    }
  })

    return filteredBooks
}
const allAuthors = () => authors
const bookCountAuthor = (root, args) => books.filter((book) => book.author === root.name).length

module.exports = {bookCount, authorCount, allBooks, allAuthors, bookCountAuthor}