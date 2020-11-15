const authenticateUser = require('./authentication');
const validateArguments = require('./argumentValidator');
const loggingMiddleware = require('./requestLogger');


const validateArgumentsMiddleware = {
   Mutation: {
      addBook: validateArguments,
      removeBook: validateArguments,
      registerUser: validateArguments,
      loanBook: validateArguments,
      // returnBook: validateArguments,
   }
}

const authenticateUserMiddleware = {};

module.exports = [loggingMiddleware, validateArgumentsMiddleware]
