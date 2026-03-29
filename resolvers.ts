import Article from "./models/article.model"
import Category from "./models/category.model"

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
      },
      getListCategory: async ()=>{
        const categories = await Category.find({
          deleted: false
        })
        return categories
      },
      getCategory:async(_: any, args:any)=>{
          const {id} = args;
          const category = await Category.findOne({
            _id: id,
          deleted: false
        })
        return category
      },
    },
    Mutation:{
      createArticle: async (_:any, args: any)=>{
        const {article} = args;

        const records = new Article(article);
        await records.save();

        return records;
        
      },
      deleteArticle: async (_:any, args: any)=>{
        const {id} = args;
        await Article.updateOne({
          _id: id,
        },{
          deleted: true,
          deletedAt: Date.now()
        })
        return "Thành công"
      },
      updateArticle: async (_: any, args: any) => {
        const { id, article } = args;
         await Article.updateOne({
          _id: id
        }, article)
        const record = await Article.findOne({
          _id: id
        })
        return record

      },
      createCategory: async (_:any, args: any)=>{
        const {category} = args;

        const records = new Category(category);
        await records.save();

        return records;
        
      },
      updateCategory: async (_: any, args: any) => {
        const { id, category } = args;
         await Category.updateOne({
          _id: id
        }, category)
        const record = await Category.findOne({
          _id: id
        })
        return record

      },
      deleteCategory: async (_:any, args: any)=>{
        const {id} = args;
        await Category.updateOne({
          _id: id,
        },{
          deleted: true,
          deletedAt: Date.now()
        })
        return "Thành công"
      },
      
    }
  }