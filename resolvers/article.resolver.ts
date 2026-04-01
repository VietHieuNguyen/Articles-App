import Article from "../models/article.model";
import Category from "../models/category.model";


export const resolversArticle = {
    Query: {
      
      getListArticle: async (_:any, args: any)=>{
        const {sortKey, sortValue} = args;
        //Sort
        // console.log(args)
        const sort: {[key: string]: any} ={}
        if(sortKey && sortValue){
          sort[sortKey] = sortValue;
        }
        //end
        const articles = await Article.find({
          deleted: false
        }).sort(sort)
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
      
    },
    Article:{
      category:async (article:any)=>{
        const id = article.categoryId;
        const category = await Category.findOne({
          _id: id
        })
        return category
      }
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
      
    }
  }