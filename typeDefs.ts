
//GraphQL
export  const typeDefs = `#graphql

  type Article {
    id: ID,
    title: String,
    avatar: String,
    description: String
  }
  type Query {
    hello: String
    getListArticle: [Article]
    getArticle(id: ID): Article
  }
  input ArticleInput{
    title: String,
    avatar: String,
    description: String
  }
  type Mutation{  #thêm sửa xóa
    createArticle(article: ArticleInput): Article
  }
`;
