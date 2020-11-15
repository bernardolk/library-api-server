'use strict';

module.exports = (sequelize, DataTypes) => {
   const User = sequelize.define('User', {
      user_id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      first_name: {
         type: DataTypes.STRING,
         allowNull: false
      },
      registration_hash: {
         type: DataTypes.STRING,
         allowNull: false
      },
      authorization_hash: {
         type: DataTypes.STRING,
         allowNull: false
      },
      library_id: {
         type: DataTypes.STRING,
         allowNull: false
      }
   },{
      tableName: 'users',
      createdAt: 'registration_date',
      updatedAt: false
   });

   return User;
};