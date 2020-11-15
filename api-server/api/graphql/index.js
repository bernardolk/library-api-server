const { makeExecutableSchema } = require('graphql-tools')
const { applyMiddleware } = require('graphql-middleware')
const { addBook, removeBook, registerUser, loanBook, returnBook } = require('./mutations')
const typeDefs = require('./types/typeDefs')
const middlewares = require('./middlewares')
// const loggingMiddleware = require('./middlewares/requestLogger')



const resolvers = {
   MutationUnion: {
      __resolveType: obj => {
         if (obj.message) {
            return "MutationSuccess";
         }
         if (obj.invalidArguments || obj.invalidOperation || obj.nullArguments) {
            return "Error";
         }
         else {
            return null;
         }
      }
   },
   RegistrationUnion: {
      __resolveType: obj => {
         if (obj.libraryId) {
            return "Credentials";
         }
         if (obj.invalidArguments || obj.invalidOperation || obj.nullArguments) {
            return "Error";
         }
         else {
            return null;
         }
      }
   },
   Mutation: { addBook, removeBook, registerUser, loanBook, returnBook }
};


const raw_schema = makeExecutableSchema({ typeDefs, resolvers });
const schema = applyMiddleware(raw_schema, ...middlewares);


module.exports = { schema };