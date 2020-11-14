const typeDefs = `
  input MessageInput {
    content: String
    author: String
  }
 
  type Message {
    id: ID!
    content: String
    author: String
  }
 
  type Query {
    getMessage(id: ID!): Message
  }
 
  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`;

module.exports = typeDefs