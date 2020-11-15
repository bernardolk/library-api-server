const crypto = require('crypto');
const salt = process.env.SALT || 'librarian-salt';
const errorHandler = require('./errorHandler');

module.exports = {
   generateCredentials: (firstName, lastName) => {

      // calculate possible library id
      let library_id = '';
      for (let i = 0; i < 6; i++) {
         library_id += Math.floor(Math.random() * 10);
      }

      // creates registration hash
      let registration_hash;
      {
         const hash = crypto.createHmac('sha512', salt);
         const credential = firstName + lastName;
         hash.update(credential);
         registration_hash = hash.digest('hex');
      }

      // creates authentication hash
      let authentication_hash
      {
         const hash = crypto.createHmac('sha512', salt);
         const credential = lastName + library_id;
         hash.update(credential);
         authentication_hash = hash.digest('hex');
      }

      return {
         libraryId: library_id,
         regHash: registration_hash,
         authHash: authentication_hash
      }
   },

   getAuthenticationHash: ({libraryId, lastName}) => {
      try {
         // gets authentication hash
         let authentication_hash
         {
            const hash = crypto.createHmac('sha512', salt);
            const credential = lastName + libraryId;
            hash.update(credential);
            authentication_hash = hash.digest('hex');
         }

         return authentication_hash;
      }
      catch (err) {
         return errorHandler(err);
      }
   }
}

