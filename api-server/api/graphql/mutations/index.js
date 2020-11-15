const { addBook, removeBook } = require('./BookMutation');
const { registerUser } = require('./UserMutation');
const { loanBook, returnBook } = require('./BookLoanMutation');


module.exports = { addBook, removeBook, registerUser, loanBook, returnBook }
