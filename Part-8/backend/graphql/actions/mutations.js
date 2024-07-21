const Book = require("../../models/bookSchema");
const Author = require("../../models/authorSchema");
const User = require("../../models/userSchema");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

// Helpers
const findOrAddAuthor = async (authorName) => {
  let author = await Author.findOne({ name: authorName });
  if (!author) {
    author = new Author({ name: authorName, bookCount: 0 });
  }

  return author;
};

const checkAuth = (user) => {
  if (!user) {
    throw new GraphQLError("Not Authenticated", {
      extensions: { code: "BAD_AUTH" },
    });
  }
};

// Mutations
const addBook = async (root, args, { currentUser }) => {
  checkAuth(currentUser);
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

  return newBook.populate("author");
};

const editAuthor = async (root, args, { currentUser }) => {
  checkAuth(currentUser);
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

const createUser = async (root, { username, favoriteGenre }) => {
  try {
    const user = new User({ username, favoriteGenre });
    return await user.save();
  } catch (error) {
    throw new GraphQLError("Error creating a new user", {
      extensions: {
        message: error.message || error,
      },
    });
  }
};

const login = async (root, { username, password }) => {
  const user = await User.findOne({ username });

  if (!user || password !== "secret") {
    throw new GraphQLError("Couldn't log in", {
      extensions: {
        code: "BAD_USER_INPUT",
      },
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
};

module.exports = { addBook, editAuthor, createUser, login };
