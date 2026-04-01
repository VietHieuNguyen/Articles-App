import Category from "../models/category.model";



export const resolversCategory = {
    Query: {
      
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