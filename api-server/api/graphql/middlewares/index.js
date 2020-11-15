const authenticateUser = require('./authenticator');
const validateArguments = require('./argumentValidator');
const loggingMiddleware = require('./requestLogger');


const validateArgumentsMiddleware = {
   Mutation: {
      addBook: validateArguments,
      removeBook: validateArguments,
      registerUser: validateArguments,
      loanBook: validateArguments,
      returnBook: validateArguments,
   }
}

const authenticationMiddleware = {
   Mutation : {
      addBook: authenticateUser,
      removeBook: authenticateUser,
      loanBook: authenticateUser,
      returnBook: authenticateUser
   }
}

module.exports = [loggingMiddleware, validateArgumentsMiddleware, authenticationMiddleware]
