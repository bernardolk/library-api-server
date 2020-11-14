
class Message {
   constructor(id, { content, author }) {
      this.id = id;
      this.content = content;
      this.author = author;
   }
}


const fakeDatabase = {};

const createMessage = (root, { input }, context, info) => {
   // Create a random id for our "database".
   var id = require('crypto').randomBytes(10).toString('hex');

   fakeDatabase[id] = input;
   return new Message(id, input);
}

const updateMessage = (root, { id, input }, context, info) => {
   if (!fakeDatabase[id]) {
      throw new Error('no message exists with id ' + id);
   }
   // This replaces all old data, but some apps might want partial update.
   fakeDatabase[id] = input;
   return new Message(id, input);
}


module.exports = { createMessage, updateMessage }