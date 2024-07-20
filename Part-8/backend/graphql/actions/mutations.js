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

const editAuthor = async (root, args) => {
  try {
    let author = await Author.findOne({ name: args.name });

    if (!author) {
      throw new GraphQLError("Author not found", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    author.born = args.setBornTo;
    await author.save();

    return author;
  } catch (error) {
    throw new GraphQLError("Failed to edit author", {
      extensions: {
        code: "BAD_USER_INPUT",
        message: error.message || error,
      },
    });
  }
};

module.exports = { addBook, editAuthor };
