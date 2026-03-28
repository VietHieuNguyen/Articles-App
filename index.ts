import express, {Express, Request, Response} from "express"
const app: Express = express()
import dotenv from "dotenv"
dotenv.config()
const port: number | string = process.env.PORT || 3000
import * as database from "./config/database"
import Article from "./models/article.model"
database.connect()
//Rest API
app.get("/articles", async (req: Request,res: Response)=>{
  const articles = await Article.find({
    deleted: false
  })
  res.json({
    article: articles
  })
} )

app.listen(port, ()=>{
  console.log(`App listening on port ${port}`)
})