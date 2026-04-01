
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

  type Mutation{  #thêm sửa xóa
    registerUser(user: RegisterUserInput) : User

  }
`;
