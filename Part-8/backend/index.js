const { ApolloServer } = require("@apollo/server");
const { WebSocketServer } = require("ws");
const http = require("http");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { useServer } = require("graphql-ws/lib/use/ws");
const express = require("express");
const { expressMiddleware } = require("@apollo/server/express4");

const mongoose = require("mongoose");
const User = require("./models/userSchema");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { makeExecutableSchema } = require("@graphql-tools/schema");

require("dotenv").config();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((e) => console.log("Couldn't connect to db", e.message));

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
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
    })
  );

  const PORT = 4000;

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  );
};

start();
