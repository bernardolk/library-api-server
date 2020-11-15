const sequelizeErrorHandler = (errObject) => {
   const null_fields = [];
   const unique_constraint_violations = [];

   console.log("\nHandling error now!");

   // check errors and save fields
   errObject.errors.forEach(validationErrorItem => {
      switch (validationErrorItem.type) {
         case 'notNull Violation':
            null_fields.push(validationErrorItem.path);
            break;
         case 'unique violation':
            unique_constraint_violations.push(validationErrorItem.path);
            break;
      }
   });

   // error message factory
   const createMessage = (pre, fields, end) => {
      let message = pre;
      const last = fields.length - 1;
      fields.forEach((field, i) => {
         const terminator = i == last ? ' ' : ',';
         message.concat(` ${field}${terminator}`)
      });

      return message;
   }

   //  compose complete error message:
   let error_messages = {};

   // if null arguments were provided
   if (null_fields.length > 0) {
      error_messages.invalidArguments =
         createMessage('Arguments ', null_fields, "can't be null.");
   }

   // if unique constraint was violated
   if (unique_constraint_violations.length > 0) {
      const violation = unique_constraint_violations[0];
      switch (violation) {
         case 'book_name':
            error_messages.invalidOperation = 'Book is already registered at library.';
            break;
         case 'registration_hash':
            error_messages.invalidOperation = 'User is already registered at library.'
            break;
      }
   }

   return error_messages === '' ? 'Unhandled error.' : error_messages;
}


module.exports = (error) => {
   if(error.code && error.message){
      console.log(error);
      return { message: "Internal server error." }
   }

   try {
      const error_messages = sequelizeErrorHandler(error);
      return { ...error_messages }
   }
   catch (internalError) {
      console.log(internalError);
      return { message: "Internal server error." }
   }
}