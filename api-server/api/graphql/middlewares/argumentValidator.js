// ** Validate if arguments are null
// ** Validate args for regex match
const addBookValidator = ({ bookName, bookDetails }) => {
   let invalidArguments = [];
   let nullArguments = [];

   if (!bookName) {
      nullArguments.push('bookName was not provided.');
   }
   if (!bookDetails) {
      nullArguments.push('bookDetails was not provided.');
   }

   if (nullArguments.length > 0) {
      const message = nullArguments.join(' ');
      return { errors: { nullArguments: message } };
   }

   const name_match = /^[a-zA-Z0-9\ \']{2,}$/;
   const details_match = /^[a-zA-Z0-9\ \']{10,}$/;

   if (!name_match.test(bookName)) {
      invalidArguments.push('bookName must have at least 2 characters and consist of only numbers, letters and spaces.');
   }

   if (!details_match.test(bookDetails)) {
      invalidArguments.push('bookDetails must have at least 10 characters and consist of only numbers, letters and spaces.');
   }

   if (invalidArguments.length > 0) {
      const message = invalidArguments.join(' ');
      return { errors: { invalidArguments: message } };
   }

   return { validated: true };
}


// ** Validate if arguments are null
// ** Validate args for regex match
const removeBookValidator = ({ bookName }) => {
   let invalidArguments = [];
   let nullArguments = [];

   if (!bookName) {
      nullArguments.push('bookName was not provided.');
   }

   if (nullArguments.length > 0) {
      const message = nullArguments.join(' ');
      return { errors: { nullArguments: message } };
   }

   const name_match = /^[a-zA-Z0-9\ \']{2,}$/;

   if (!name_match.test(bookName)) {
      invalidArguments.push('bookName must have at least 2 characters and consist of only numbers, letters and spaces.');
   }

   if (invalidArguments.length > 0) {
      const message = invalidArguments.join(' ');
      return { errors: { invalidArguments: message } };
   }

   return { validated: true };
}


// ** Validate if arguments are null
// ** Validate if names have at least two characters and are letters only
const registerUserValidator = ({ firstName, lastName }) => {
   let invalidArguments = [];
   let nullArguments = [];

   if (!firstName) {
      nullArguments.push('firstName was not provided.');
   }
   if (!lastName) {
      nullArguments.push('lastName was not provided.');
   }

   if (nullArguments.length > 0) {
      const message = nullArguments.join(' ');
      return { errors: { nullArguments: message } };
   }

   const name_match = /^[a-zA-Z]{2,}$/;

   if (!name_match.test(firstName)) {
      invalidArguments.push('firstName must have at least 2 characters and consist of only letters.');
   }

   if (!name_match.test(lastName)) {
      invalidArguments.push('lastName must have at least 2 characters and consist of only letters.');
   }

   if (invalidArguments.length > 0) {
      const message = invalidArguments.join(' ');
      return { errors: { invalidArguments: message } };
   }

   return { validated: true };
}


// ** Validate if arguments are null
// ** Validate if requestedDueDate is in a valid 09/09/0909 or 09-09-09 format
// ** Validate if requestDueDate is in the future
const loanBookValidator = ({ bookName, requestedDueDate }) => {
   let invalidArguments = [];
   let nullArguments = [];

   if (!bookName) {
      nullArguments.push('bookName was not provided.');
   }
   if (!requestedDueDate) {
      nullArguments.push('requestedDueDate was not provided.');
   }

   if (nullArguments.length > 0) {
      const message = nullArguments.join(' ');
      return { errors: { nullArguments: message } };
   }

   const name_match = /^[a-zA-Z0-9\ \']{2,}$/;

   if (!name_match.test(bookName)) {
      invalidArguments.push('bookName must have at least 2 characters and consist of only numbers, letters and spaces.');
   }

   const date = Date.parse(requestedDueDate);
   const date_match = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
   if (isNaN(date)) {
      invalidArguments.push('provided requestedDueDate is invalid.');
   }
   else if(!date_match.test(requestedDueDate)){
      invalidArguments.push('requestedDueDate date format is invalid. (MM-DD-YYYY or MM/DD/YYYY)');
   }
   else if (date < Date.now()) {
      invalidArguments.push('requestedDueDate should be a date in the future.');
   }
   
   if (invalidArguments.length > 0) {
      const message = invalidArguments.join(' ');
      return { errors: { invalidArguments: message } };
   }

   return { validated: true };
}




const returnBookValidator = ({bookName}) => {
   let invalidArguments = [];
   let nullArguments = [];

   if (!bookName) {
      nullArguments.push('bookName was not provided.');
   }

   if (nullArguments.length > 0) {
      const message = nullArguments.join(' ');
      return { errors: { nullArguments: message } };
   }

   const name_match = /^[a-zA-Z0-9\ \']{2,}$/;

   if (!name_match.test(bookName)) {
      invalidArguments.push('bookName must have at least 2 characters and consist of only numbers, letters and spaces.');
   }

   if (invalidArguments.length > 0) {
      const message = invalidArguments.join(' ');
      return { errors: { invalidArguments: message } };
   }

   return { validated: true };
}




const validateArguments = async (resolve, root, args, context, info) => {
   let validation;

   switch (info.fieldName) {
      case 'addBook':
         validation = addBookValidator(args);
         break;
      case 'removeBook':
         validation = removeBookValidator(args);
         break;
      case 'registerUser':
         validation = registerUserValidator(args);
         break;
      case 'loanBook':
         validation = loanBookValidator(args);
         break;
      case 'returnBook':
         console.log('RETURNED BOOK')
         validation = returnBookValidator(args);
         break;
   }

   if (validation === undefined) {
      console.log("\nERROR >> validateArguments middleware >> route not found");
      return { message: "Internal server error." };
   }
   else if (!validation.errors) {
      const result = await resolve(root, args, context, info);
      return result;
   }
   else {
      return { ...validation.errors }
   }


   // NEEDS TO, FOR EACH MUTATION, CHECK IF ALL ARGUMENTS WERE PROVIDED

   // NEEDS TO CHECK IF ARGUMENTS ARE IN VALID FORMAT (NO NUMBERS OR SPECIAL CHARS FOR FIRST OR LAST NAME)

   // NEEDS TO CHECK IF ARGUMENTS ARE MALICIOUS

   // RESOLVE TO NEXT MIDDLEWARE

};


module.exports = validateArguments