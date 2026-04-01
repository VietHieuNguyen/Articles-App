import Article from "../models/article.model";
import Category from "../models/category.model";


export const resolversArticle = {
    Query: {
      
      getListArticle: async (_:any, args: any)=>{
        const {sortKey, sortValue, currentPage, limitItem,filterKey, filterValue} = args;
        const find:{[key: string]: boolean|any} ={
          deleted: false
        }
        //Sort
        // console.log(args)
        const sort: {[key: string]: any} ={}
        if(sortKey && sortValue){
          sort[sortKey] = sortValue;
        }
        //end
        //Pagination
        const skip = (currentPage - 1)* limitItem;
        //End Pagination

        if(filterKey && filterValue){
          find[filterKey] = filterValue;
        }
        const articles = await Article.find(find).sort(sort).limit(limitItem).skip(skip)
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