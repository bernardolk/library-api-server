const { makeExecutableSchema } = require('graphql-tools')
const { applyMiddleware } = require('graphql-middleware')
const { createMessage, updateMessage } = require('./mutations')
const typeDefs = require('./types/typeDefs')
const loggingMiddleware = require('./middlewares/loggingMiddleware.js')


const resolvers = {
   Mutation: { createMessage, updateMessage }
};


const raw_schema = makeExecutableSchema({ typeDefs, resolvers });
const schema = applyMiddleware(raw_schema, loggingMiddleware);


module.exports = { schema };