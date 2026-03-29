import Article from "./models/article.model"

export const resolvers = {
    Query: {
      hello: () => {
        return "Hello World!"
      },
      getListArticle: async ()=>{
        const articles = await Article.find({
          deleted: false
        })
        return articles
      },
      getArticle : async(_: any, args:any)=>{
          const {id} = args;
          const articles = await Article.findOne({
            _id: id,
          deleted: false
        })
        return articles
      }
    },
    Mutation:{
      createArticle: async (_:any, args: any)=>{
        const {article} = args;

        const records = new Article(article);
        await records.save();

        return records;
        
      }
    }
  }