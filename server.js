var express = require('express');
var { graphqlHTTP } = require('express-graphql');
const { printSchema, buildSchema } = require("graphql");
const { loadSchemaSync } = require("@graphql-tools/load");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");

const typeDefs = loadSchemaSync("schema.graphql", {
  loaders: [new GraphQLFileLoader()],
});

//console.log(printSchema(typeDefs))
// Construct a schema, using GraphQL schema language
/*var schema = buildSchema(`
  type Query {
    hello: String
  }
`);*/
var schema = buildSchema(printSchema(typeDefs));
// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');