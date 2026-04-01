import { generateRandomNumber } from "../helpers/generate";
import Category from "../models/category.model";
import User from "../models/user.model";
import bcrypt from "bcrypt"
import crypto from "crypto"
const level = 10

export const resolversUser = {

  Mutation: {
    registerUser: async (_: any, args: any) => {
      const { user } = args;
      
      const existEmail = await User.findOne({
        email: user.email
      })
      
      if (existEmail) {
        return ({
          code: 400,
          "message": "Tài khoản đã tồn tại"
        })
      } else {
        user.password = await bcrypt.hash(user.password, level)


        user.token = generateRandomNumber(10);
        const newUser = new User(user)
        const data = await newUser.save()
        console.log(user)
        return {
          code: 200,
          "message": "Đăng kí thành công",
          id: data.id,
          fullName: data.fullName,
          token: data.token
        }
      }
    }
  }
}