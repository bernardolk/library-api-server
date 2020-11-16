const db = require('../../../data/models');
const Book = db.Book;
const BookLoan = db.BookLoan;
const errorHandler = require('../../services/errorHandler');

// ** Assigns book to a particular user and make it unavailable
// ** If book is not found, return invalidArgument error
// ** If book is already loaned, return invalidOperation error
// ** If requestedDueDate is in the past or too far away, return invalidArgument error
// ** If book is available and requestDueDate is fine, return success message 
const loanBook = async (root, { userId, bookName, requestedDueDate }, context, info) => {
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
               await book.save({ transaction });

               await BookLoan
                  .update({
                     user: userId,
                     dateLoaned: Date.now(),
                     dueDate: requestedDueDate
                  }, {
                     where: {
                        book: book.id
                     }
                  }, { transaction });
            }

            return { error: false };
         });

      // return errors if any
      if (loaned.error) {
         return { ...loaned.errors }
      }

      const plural = days_to_due_date === 1 ? '' : 's'

      return {
         message:
            `Operation successful: Book '${bookName}' should be returned in ${days_to_due_date} day${plural}.`
      }
   }
   catch (err) {
      console.log(err);
      return errorHandler(err);
   }
}


// ** Returns a loaned book
// ** If book is not registered, returns an invalidOperation error
// ** If book is available, returns an invalidOperation error
// ** If book is not being hold by user, returns an invalidOperation error
// ** If date is later than dueDate, returns a penalty message along success message
const returnBook = async (root, { userId, bookName }, context, info) => {
   try {
      const book = await Book
         .findOne({
            where: {
               name: bookName
            }
         });

      if (!book) {
         return { invalidOperation: `Book '${bookName}' not found.` };
      }
      if (book.status == 1) {
         return { invalidOperation: `Book '${bookName}' is available.` };
      }

      const loan = await BookLoan
         .findOne({
            where: {
               book: book.id
            }
         });


      if (loan.user != userId) {
         return { invalidOperation: `Book '${bookName}' is not in your possession to be returned by you.` };
      }
      else {
         let penalty = false;
         if (Date.parse(loan.dueDate) < Date.now()) {
            penalty = true;
         }

         // commit changes to database
         // SERIALIZABLE transaction to ensure no concurrency problems
         await db.sequelize.transaction(
            { isolationLevel: db.Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE },
            async transaction => {
               book.status = 1;
               await book.save({ transaction });
               loan.user = null;
               loan.dueDate = null;
               loan.dateLoaned = null;
               await loan.save({ transaction });
            });

         const penalty_message = penalty ?
            " Book return is late. You have to pay a penalty." :
            " Book return is on time. No penalty due.";


         return { message: "Operation successful, book has been returned." + penalty_message }
      }
   } catch (err) {
      return errorHandler(err);
   }
}


module.exports = { loanBook, returnBook }



