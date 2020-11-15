'use strict';

module.exports = (sequelize, DataTypes) => {
   const User = sequelize.define('User', {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         field: 'user_id'
      },
      firstName: {
         type: DataTypes.STRING,
         allowNull: false,
         field: 'first_name'
      },
      regHash: {
         type: DataTypes.STRING,
         allowNull: false,
         field: 'registration_hash'
      },
      authHash: {
         type: DataTypes.STRING,
         allowNull: false,
         field: 'authentication_hash'
      },
      libraryId: {
         type: DataTypes.STRING,
         allowNull: false,
         field: 'library_id'
      }
   },{
      tableName: 'users',
      createdAt: 'registration_date',
      updatedAt: false
   });

   return User;
};