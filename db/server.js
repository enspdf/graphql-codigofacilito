const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const { merge } = require("lodash");
const courseTypeDefs = require("./types/course.types");
const userTypeDefs = require("./types/user.types");

const courseResolvers = require("./resolvers/course.resolvers");
const userResolvers = require("./resolvers/user.resolvers");

const authFunc = require("./libs/auth");

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

const server = new ApolloServer({
  typeDefs: [typeDefs, courseTypeDefs, userTypeDefs],
  resolvers: merge(resolver, courseResolvers, userResolvers),
  context: authFunc,
});

server.applyMiddleware({ app });

app.listen(8080, () => {
  console.log("Servidor iniciado");
});
