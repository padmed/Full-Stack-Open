const Author = require("../../models/authorSchema");
const Book = require("../../models/bookSchema");

const bookCount = async () => (await Book.find({})).length;
const authorCount = async () => (await Author.find({})).length;

const allBooks = async (root, { genre }) => {
  const query = genre ? { genres: genre } : {};
  return (await Book.find(query).populate("author")) || [];
};

const allAuthors = async () => {
  const authors = await Author.find({});
  authors.bookCount = authors.bookCount;
  return authors;
};

const me = (root, args, { currentUser }) => currentUser;
module.exports = {
  bookCount,
  authorCount,
  allBooks,
  allAuthors,

  me,
};
