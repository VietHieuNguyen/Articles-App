import express, { Express, Request, Response } from "express"
const app: Express = express()
import dotenv from "dotenv"
import * as database from "./config/database"
import Article from "./models/article.model"
import { Query } from "mongoose"
import { ApolloServer } from "@apollo/server"
import cors from "cors"
import { expressMiddleware } from '@as-integrations/express5';
import { typeDefs } from "./typeDefs/index.typeDefs"
import { resolvers } from "./resolvers"


const startServer = async () => {
  dotenv.config()

  const port: number | string = process.env.PORT || 3000

  database.connect()


  
  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers,
    
  });
  await apolloServer.start();
  app.use(
    "/graphql",
    cors(),             // Bật CORS
    express.json(),     // Bắt buộc phải có để Express đọc được body JSON từ GraphQL
    expressMiddleware(apolloServer)
  );
  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
}
startServer();
