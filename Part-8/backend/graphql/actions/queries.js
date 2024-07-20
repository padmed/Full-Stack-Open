books = require("../../data/books");
authors = require("../../data/authors");
const Author = require("../../models/authorSchema");
const Book = require("../../models/bookSchema");

const bookCount = async () => (await Book.find({})).length;
const authorCount = async () => (await Author.find({})).length;

const allBooks = async (root, { genre }) => {
  const query = genre ? { genres: genre } : {};
  return (await Book.find(query).populate("author")) || [];
};

const allAuthors = async () => await Author.find({});

const bookCountAuthor = (root, args) =>
  books.filter((book) => book.author === root.name).length;

module.exports = {
  bookCount,
  authorCount,
  allBooks,
  allAuthors,
  bookCountAuthor,
};
