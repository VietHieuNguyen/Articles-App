
//GraphQL
export  const typeDefsCategory = `#graphql

  type Category {
    id: ID,
    title: String,
    avatar: String,

  }
  type Query {
    getListCategory: [Category]
    getCategory(id: ID): Category


  }
  input CategoryInput{
    title: String,
    avatar: String
  }
  type Mutation{  #thêm sửa xóa
    createCategory(category: CategoryInput): Category
    updateCategory(id: ID, category: CategoryInput): Category
    deleteCategory(id: ID): String
  }
`;
