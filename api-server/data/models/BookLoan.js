'use strict';

module.exports = (sequelize, DataTypes) => {
   const BookLoan =  sequelize.define('BookLoan',{
      book_loan_id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      book: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
      user: {
         type: DataTypes.INTEGER,
      },
      date_loaned: {
         type: DataTypes.DATE,
      },
      due_date: {
         type: DataTypes.DATE,
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