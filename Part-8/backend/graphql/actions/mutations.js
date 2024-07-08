const { v1: uuid } = require("uuid");
books = require("../../data/books");
authors = require("../../data/authors");

const addBook = (root, args) => {
  const authorExists = authors.find((author) => author.name === args.author);
  if (!authorExists) {
    const newAuthor = {
      name: args.author,
      id: uuid(),
    };
    authors = [...authors, newAuthor];
  }

  const newBook = { ...args, id: uuid() };
  books = [...books, newBook];
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
