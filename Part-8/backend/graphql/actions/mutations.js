const { v1: uuid } = require("uuid");
books = require("../../data/books");
authors = require("../../data/authors");
const Book = require("../../models/bookSchema");
const Author = require("../../models/authorSchema");
const { GraphQLError } = require("graphql");

const findOrAddAuthor = async (authorName) => {
  let author = await Author.findOne({ name: authorName });
  if (!author) {
    author = new Author({ name: authorName, bookCount: 0 });
  }

  return author;
};

const addBook = async (root, args) => {
  const author = await findOrAddAuthor(args.author);
  const newBook = new Book({ ...args, author: author._id });

  try {
    await newBook.save();
    await author.save();
  } catch (error) {
    throw new GraphQLError("Failed to add a new book", {
      extensions: {
        code: "BAD_USER_INPUT",
        message: error.message || error,
      },
    });
  }

  return newBook;
};

const editAuthor = (root, args) => {
  let authorFound = null;

  authors = authors.map((author) => {
    if (author.name === args.name) {
      author["born"] = args.setBornTo;
      authorFound = author;
    }
    return author;
  });

  return authorFound;
};

module.exports = { addBook, editAuthor };
