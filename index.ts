import express, { Express } from "express"
const app: Express = express()
import dotenv from "dotenv"
import * as database from "./config/database"

import { ApolloServer } from "@apollo/server"
import cors from "cors"
import { expressMiddleware } from '@as-integrations/express5';
import { typeDefs } from "./typeDefs/index.typeDefs"
import { resolvers } from "./resolvers/index.resolver"
import { requireAuth } from "./middlewares/auth.middeware"


const startServer = async () => {
  dotenv.config()

  const port: number | string = process.env.PORT || 3000

  database.connect()


  
  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    introspection: true
  });
  await apolloServer.start();
  app.use(
    "/graphql",
    requireAuth,
    cors(),             // Bật CORS
    express.json(),     // Bắt buộc phải có để Express đọc được body JSON từ GraphQL
    expressMiddleware(apolloServer,{
      context: async({req})=>{
        return {
          user: (req as any).user
        }
      }
    })
  );
  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
}
startServer();
