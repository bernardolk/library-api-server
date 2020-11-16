const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { schema } = require('./api/graphql');

const app = express();

const client = process.env.CLIENT || false;
const port = process.env.PORT || 4000;

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: client,
}));


app.listen(port, () => {
  console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
});