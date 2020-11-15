const express = require('express');
const { graphqlHTTP } = require('express-graphql');
// const { schema } = require('./services/graphql');
const { schema } = require('./api/graphql');

const app = express();

const client = process.env.CLIENT || false;

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: client,
}));

app.listen(process.env.PORT || 4000, () => {
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});