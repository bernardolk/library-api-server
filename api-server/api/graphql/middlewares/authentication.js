const User = require('../../../data/models').User;
const { getAuthenticationHash } = require('../../services/credentials');
const errorHandler = require('../../services/errorHandler');

const authenticateUser = async (resolve, root, { lastName, libraryId }, context, info) => {
   try {
      // Argument error handling
      if (!lastName || !libraryId) {
         return { invalidOperation: "Credentials not provided." }
      }

      const name_match = /^[a-z]{2,}$/;
      if (!name_match.test(lastName)) {
         return { invalidArguments: 'invalid last name.' };
      }

      const library_id_match = /^[0-9]{6,6}$/;
      if (!library_id_match.test(libraryId)) {
         return { invalidArguments: 'invalid library id.' };
      }

      // Gets user auth hash
      const authHash = getAuthenticationHash({ libraryId, lastName });

      const user = await User
         .findOne({
            where: {
               authHash: authHash
            }
         });
      
      if(user){
         const result = await resolve(root, {userId: user.id, ...args}, context, info);
         return result;
      }
      else{
         return { invalidOperation : 'Authentication failed.' };
      }
      
   }
   catch (err) {
      return errorHandler(err);
   }
}

module.exports = authenticateUser