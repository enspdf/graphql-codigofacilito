const express = require("express");
const mongoose = require("mongoose");
const { graphqlExpress, graphiqlExpress } = require("graphql-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const { merge } = require("lodash");
const bodyParser = require("body-parser");
const courseTypeDefs = require("./types/course.types");
const courseResolvers = require('./resolvers/course.resolvers');

mongoose.connect("mongodb://localhost/graphql_db_course", {
  useNewUrlParser: true
});

const app = express();

const typeDefs = `
    type Alert {
        message: String
    }

    type Query {
        _ : Boolean
    }

    type Mutation {
        _ : Boolean
    }
`;

const resolver = {};

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, courseTypeDefs],
  resolvers: merge(resolver, courseResolvers)
});

app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({
    schema
  })
);

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

app.listen(8080, () => {
  console.log("Servidor iniciado");
});
