

const typeDefs = `
  type Book {
     name: String
     details: String
  }

  union MutationUnion = MutationSuccess | Error 

  type Error {
      invalidArguments: String
      invalidOperation: String
  }

  type MutationSuccess {
     message: String!
  }
 
  union RegistrationUnion = Credentials | Error

   type Credentials {
      libraryId: String!
  }

  type Mutation {
    addBook(bookName: String, bookDetails: String): MutationUnion!
    removeBook(bookName: String): MutationUnion!
    registerUser(firstName: String, lastName: String): RegistrationUnion!
  }

 

  type Query {
     _dummy: String
  }
`;

module.exports = typeDefs