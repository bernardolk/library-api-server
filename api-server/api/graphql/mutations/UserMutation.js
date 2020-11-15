const db = require('../../../data/models');
const errorHandler = require('../../services/errorHandler');
const User = db.User;
const { getCredentials } = require('../../services/credentials');


// ** Registers new User to the database
// ** If user is not already registered, add User to library database and return success message
// ** If user is already registered, will return invalidOperation error
const registerUser = async (root, { firstName, lastName }, context, info) => {
   try {
      const {
         libraryId,
         authHash,
         regHash
      } = getCredentials(firstName, lastName);

      await User
         .create({
            libraryId,
            regHash,
            authHash,
            firstName
         });

      return { libraryId }
   }
   catch (dbError) {
      return errorHandler(dbError);
   }
}

module.exports = { registerUser }


