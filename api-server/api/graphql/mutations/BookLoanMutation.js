const db = require('../../../data/models');
const Book = db.Book;
const BookLoan = db.BookLoan;
const errorHandler = require('../../services/errorHandler');

// ** Assigns book to a particular user and make it unavailable
// ** If book is not found, return invalidArgument error
// ** If book is already loaned, return invalidOperation error
// ** If requestedDueDate is in the past or too far away, return invalidArgument error
// ** If book is available and requestDueDate is fine, return success message 
const loanBook = async (root, { bookName, requestedDueDate }, context, info) => {
   try {
      const ONE_DAY = 1000 * 60 * 60 * 24;
      const differenceMs = Math.abs(Date.now() - Date.parse(requestedDueDate));
      const days_to_due_date = Math.ceil(differenceMs / ONE_DAY);

      if (days_to_due_date > 10) {
         return { invalidOperation: "You can't loan a book for more than 10 days." }
      }

      // SERIALIZABLE transaction to ensure no concurrency problems  
      const loaned = await db.sequelize.transaction(
         { isolationLevel: db.Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE },
         async transaction => {

            const book = await
               Book.
                  findOne({
                     where: {
                        name: bookName
                     },
                     // include: { model: BookLoan, as: 'loanStatus' }
                  }, { transaction });

            // Checks if book was not found
            if (!book) {
               return { error: true, errors: { invalidOperation: "Book doesn't exists." } }
            }

            // Checks if book is available
            if (book.status == 2) {
               return { error: true, errors: { invalidOperation: 'Book is unavailable (loaned).' } };
            }
            // If available, update Book and BookLoan
            else if (book.status == 1) {
               book.status = 2;
               await book.save();

               await BookLoan
                  .update({
                     user: 3,
                     dateLoaned: Date.now(),
                     dueDate: requestedDueDate
                  }, {
                     where: {
                        book: book.id
                     }
                  });
            }

            return { error: false };
         });

      // return errors if any
      if (loaned.error) {
         return { ...loaned.errors }
      }

      return {
         message:
            `Operation successful: Book '${bookName}' should be returned in ${days_to_due_date} days.`
      }
   }
   catch (err) {
      console.log(err);
      return errorHandler(err);
   }
}


// // ** Removes a Book from the library's database
const returnBook = async (root, { bookName }, context, info) => {
   return {message: 'not implementd'}
}


module.exports = { loanBook, returnBook }



