'use strict';

module.exports = (sequelize, DataTypes) => {
   const Book = sequelize.define('Book', {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         field: 'book_id'
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
         field: 'book_name'
      },
      status: {
         type: DataTypes.INTEGER,
         allowNull: false,
         field: 'book_status'
      },
      details: {
         type: DataTypes.STRING,
         allowNull: false,
         field: 'book_details'
      },
   }, {
      tableName: 'books',
      createdAt: 'date_added',
      updatedAt: false
   });

   Book.associate = (models) => {
      Book.hasOne(models.BookStatus, {
         foreignKey: 'book_status',
         as: 'bookStatus',
         onDelete: 'cascade',
         hooks: true
      });
   };

   return Book;
};