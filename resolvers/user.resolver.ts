import { generateRandomNumber } from "../helpers/generate";
import Category from "../models/category.model";
import User from "../models/user.model";
import bcrypt from "bcrypt"
import crypto from "crypto"
const level = 10

export const resolversUser = {
  Query:{
    getUser: async(_:any, args: any, context: any)=>{
      // const {id} = args
      if(!context["user"].token){
        return {
          code: 400,
          message:"Lỗi"
        }
      }
      const infoUser = await User.findOne({
        token: context["user"].token,
        deleted: false
      });
      // console.log(infoUser)
      if(infoUser){
        return{
          code: 200,
          id: infoUser.id,
          fullName: infoUser.fullName,
          token: infoUser.token
        }
      }

      return {
        code: 400,
        message: "Thất bại"
      }
    }
  },
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
          message: "Đăng kí thành công",
          id: data.id,
          fullName: data.fullName,
          token: data.token
        }
      }
    },
    loginUser: async (_: any, args: any) => {
      const { user } = args;
      const infoUser = await User.findOne({
        email: user.email,
        deleted: false
      });
      
      if (infoUser) {
        const isMatch = await bcrypt.compare(user.password,infoUser.password!);
        if (isMatch) {
          return {
            code: 200,
            "message": "Đăng nhập thành công",
            id: infoUser.id,
            fullName: infoUser.fullName,
            token: infoUser.token
          }
        }else{
          return {
            code: 400,
            message: "Sai mật khẩu"
          }
        }
      } else {
        return {
          code: 400,
          "message": "Đăng nhập thất bại"
        }
      }
    }
  }
}