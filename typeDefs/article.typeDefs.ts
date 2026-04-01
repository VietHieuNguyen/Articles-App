
//GraphQL
export  const typeDefsArticle = `#graphql

  type Article {
    id: ID,
    title: String,
    avatar: String,
    description: String
    category: Category
  }
  
  type Query {
    hello: String
    getListArticle(
      sortKey: String, 
      sortValue: String,
      currentPage: Int = 1,
      limitItem: Int = 2,
      filterKey: String,
      filterValue: String): [Article]
    getArticle(id: ID): Article

   


  }
  input ArticleInput{
    title: String,
    avatar: String,
    description: String
    cagtegoryId: String
  }

  type Mutation{  #thêm sửa xóa
    createArticle(article: ArticleInput): Article
    deleteArticle(id: ID): String
    updateArticle(id: ID, article: ArticleInput): Article

  }
`;
