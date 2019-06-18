const express = require("express");
const mongoose = require("mongoose");
const { graphqlExpress, graphiqlExpress } = require("graphql-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const { merge } = require("lodash");
const bodyParser = require("body-parser");
const courseTypeDefs = require("./types/course.types");
const userTypeDefs = require("./types/user.types");

const courseResolvers = require("./resolvers/course.resolvers");
const userResolvers = require("./resolvers/user.resolvers");

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
  typeDefs: [typeDefs, courseTypeDefs, userTypeDefs],
  resolvers: merge(resolver, courseResolvers, userResolvers)
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
