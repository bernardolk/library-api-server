'use strict';

module.exports = (sequelize, DataTypes) => {
   const BookLoan =  sequelize.define('BookLoan',{
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         field: 'book_loan_id'
      },
      book: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
      user: {
         type: DataTypes.INTEGER,
      },
      dateLoaned: {
         type: DataTypes.DATE,
         field: 'date_loaned'
      },
      dueDate: {
         type: DataTypes.DATE,
         field: 'due_date'
      }
   }, {
      tableName: 'book_loans',
      createdAt: false,
      updatedAt: false  
   });

   BookLoan.associate = (models) => {
      BookLoan.belongsTo(models.Book, {
            foreignKey: 'book',
            as: 'bookLoan',
            onDelete: 'CASCADE',
            hooks: true
         });
      };

   return BookLoan;
};