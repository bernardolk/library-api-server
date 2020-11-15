const { makeExecutableSchema } = require('graphql-tools')
const { applyMiddleware } = require('graphql-middleware')
const { addBook, removeBook, registerUser } = require('./mutations')
const typeDefs = require('./types/typeDefs')
const loggingMiddleware = require('./middlewares/requestLogger.js')


const resolvers = {
   MutationUnion: {
      __resolveType: obj => {
         if(obj.message){
            return "MutationSuccess";
         }
         if(obj.invalidArguments || obj.invalidOperation){
            return "Error";
         }
         else{
            return null;
         }
      }
   },
   RegistrationUnion: {
      __resolveType: obj => {
         if(obj.libraryId){
            return "Credentials";
         }
         if(obj.invalidArguments || obj.invalidOperation){
            return "Error";
         }
         else{
            return null;
         }
      }
   },
   Mutation: { addBook, removeBook, registerUser }
};


const raw_schema = makeExecutableSchema({ typeDefs, resolvers });
const schema = applyMiddleware(raw_schema, loggingMiddleware);


module.exports = { schema };