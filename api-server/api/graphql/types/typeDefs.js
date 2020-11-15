

const typeDefs = `
  type Book {
     name: String
     details: String
  }

  union MutationUnion = MutationSuccess | Error 

  type Error {
      invalidArguments: String
      invalidOperation: String
      nullArguments: String
  }

  type MutationSuccess {
     message: String!
  }
 
  union RegistrationUnion = Credentials | Error

   type Credentials {
      libraryId: String!
  }

  type Mutation {
    addBook(bookName: String, bookDetails: String, 
      lastName: String, libraryId: String): MutationUnion!
    removeBook(bookName: String, lastName: String, libraryId: String): MutationUnion!
    registerUser(firstName: String, lastName: String): RegistrationUnion!
    loanBook(bookName: String, requestedDueDate: String,
      lastName: String, libraryId: String): MutationUnion!
    returnBook(bookName: String, lastName: String, libraryId: String): MutationUnion!
  }

 

  type Query {
     _dummy: String
  }
`;

module.exports = typeDefs