const db = require('../../../data/models');
const Book = db.Book;
const BookLoan = db.BookLoan;

const errorHandler = require('../../services/errorHandler');

// ** Adds a Book to the library database
// ** If database already contains the book, returns an invalidOperation error
// ** On the contrary, creates associated BookLoan and Book records and returns success message
const addBook = async (root, { bookName, bookDetails }, context, info) => {
   try {
      const book = await db.sequelize.transaction(async transaction => {
         const book = await Book
            .create({
               name: bookName,
               details: bookDetails,
               status: 1
            }, { transaction });

         await BookLoan
            .create({
               book: book.id
            }, { transaction });

         return book;
      });

      return { message: "Operation successful: book added to library." }
   }
   catch (err) {
      return errorHandler(err);
   }
}

// ** Removes a Book from the library's database
// ** If the Book is not found returns an invalidOperation error
// ** If found, associated BookLoan and Book records are deleted and returns a success message 
const removeBook = async (root, { bookName }, context, info) => {
   try {
      const deleted = await db.sequelize.transaction(async transaction => {
         const book = await
            Book.findOne({
               where: {
                  name: bookName
               }
            },{transaction});

         if (book) {
            const loan_destroy = await
               BookLoan
                  .destroy({
                     where: {
                        book: book.id
                     }
                  },{transaction});

            const book_destroy = await
               Book
                  .destroy({
                     where: {
                        name: bookName
                     }
                  },{transaction});

            return true;
         }
         else {
            return false;
         }
      });

      if(deleted){
         return { message: "Operation successful: book removed from library." };
      }
      else{
         return { invalidOperation: "Book does not exist to be removed."};
      }
   }
   catch (err) {
      return errorHandler(err);
   }
}


module.exports = { addBook, removeBook }



