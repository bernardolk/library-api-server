'use strict';

module.exports = (sequelize, DataTypes) => {
   const BookStatus = sequelize.define('BookStatus', {
      book_status_id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      status_name: {
         type: DataTypes.STRING,
         allowNull: false
      }
   },{
      tableName: 'book_statuses',
      createdAt: false,
      updatedAt: false  
   });

   return BookStatus;
};