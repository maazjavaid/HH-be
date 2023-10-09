import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./src/gql/Users/UserResolver";

//For env File
dotenv.config();
require("./src/db");
const app: Application = express();
(async () => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
})();
app.listen(4000, () => {
  console.log("express loading on server 4000");
});
