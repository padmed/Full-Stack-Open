const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const mongoose = require("mongoose");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const User = require("./models/userSchema");
require("dotenv").config();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((e) => console.log("Couldn't connect to db", e.message));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;

    if (auth && auth.startsWith("Bearer ")) {
      try {
        const decodedToken = jwt.verify(
          auth.substring(7),
          process.env.JWT_SECRET
        );

        const currentUser = await User.findById(decodedToken.id);

        return { currentUser };
      } catch (error) {
        throw new GraphQLError("Invalid token", {
          extensions: {
            code: "BAD AUTH",
            message: error.message || error,
          },
        });
      }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
