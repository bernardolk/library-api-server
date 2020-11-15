

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
 
  type Mutation {
    addBook(bookName: String, bookDetails: String): MutationUnion!
    removeBook(bookName: String): MutationUnion!
  }

  type Query {
     _dummy: String
  }
`;

module.exports = typeDefs