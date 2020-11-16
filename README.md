# library-api-server
An example project for node.js, express, graphql, sequelize (postgresql) stack

# Instalation  
1. Download or clone project
2. Make sure to have postgreSQL installed (v 13.1 recommended)
3. Login into postgres with user 'postgres' and run the script located in /util to scaffold the database
4. run 'npm install' inside /api-server to install all dependencies
5. configure your postgresql connection at /config/config.js if necessary 
6. run 'npm run sclient' to start server with graphiql client at 'localhost:4000/graphql'

  
   
# Mutations
Below is described the input and output fields and types for each available mutation.  
Each mutation has a return type union that can return an Error type response, with the following fields:  
  
**Return Fields (type Error)**  
invalidArguments: String  
invalidOperation: String  
nullArguments: String  
  
  
## registerUser
**Input Fields:**  
firstName: String!  
lastName: String!  
**Return Fields (type Credentials):**  
libraryId: String!  
  
## addBook
**Input Fields:**  
bookName: String!  
bookDetails: String!  
libraryId: String!  
lastName: String!  
**Return Fields (type MutationSuccess):**  
message: String!  

## removeBook
**Input Fields:**  
bookName: String!  
libraryId: String!  
lastName: String!  
**Return Fields (type MutationSuccess):**  
message: String!    
  
## loanBook
**Input Fields:**  
bookName: String!  
requestedDueDate: String!  
libraryId: String!  
lastName: String!  
**Return Fields (type MutationSuccess):**  
message: String!   

## returnBook
**Input Fields:**  
bookName: String!  
libraryId: String!  
lastName: String!  
**Return Fields (type MutationSuccess):**  
message: String!   
