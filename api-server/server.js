const express = require('express');
const { graphqlHTTP } = require('express-graphql');
// const { schema } = require('./services/graphql');
const { schema } = require('./api/graphql');
const _config = require('./config/keys');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(_config.PORT, () => {
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});