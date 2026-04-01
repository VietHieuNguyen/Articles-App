
//GraphQL
export  const typeDefsUser = `#graphql

  type User {
    id: ID,
    fullName: String,
    token: String,
    email: String,
    code: Int,
    message: String
  }
  
  input RegisterUserInput{
    fullName:String,
    email: String,
    password: String
  }
  input LoginUserInput{
    email: String,
    password: String
  }
  type Query{
    getUser: User
  }
  type Mutation{  #thêm sửa xóa
    registerUser(user: RegisterUserInput) : User
    loginUser(user: LoginUserInput): User
  }
`;
