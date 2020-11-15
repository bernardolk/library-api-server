const db = require('../../../data/models');
const Book = db.Book;
const BookLoan = db.BookLoan;

const sequelizeErrorHandler = require('../../services/sequelizeErrorHandler');

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

      return { name: book.name, details: book.details }
   }
   catch (dbError) {
      try {
         const message = sequelizeErrorHandler(dbError);
         return { message }
      }
      catch (internalError) {
         console.log(internalError);
         return { message: "Internal server error." }
      }
   }
}

const removeBook = async (root, { bookName }, context, info) => {
   try {
      const book = await
         Book
            .destroy({
               where: {
                  name: bookName
               }
            });

      console.log(book);

      return { message: "Operation successfull: book removed from library." };
   }
   catch (dbError) {
      try {
         const message = sequelizeErrorHandler(dbError);
         return { message }
      }
      catch (internalError) {
         console.log(internalError);
         return { message: "Internal server error." }
      }
   }
}


module.exports = { addBook, removeBook }



