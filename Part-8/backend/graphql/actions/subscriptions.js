const { PubSub } = require("graphql-subscriptions");
const pubSub = new PubSub();

const bookAdded = () => {
  return pubSub.asyncIterator("BOOK_ADDED");
};

module.exports = { bookAdded, pubSub };
