import crypto from "crypto"
export const generateRandomNumber = (length: number)=>{
  const max = Math.pow(10, length)
  const min = Math.pow(10, length - 1)
  const result = crypto.randomInt(min, max).toString()
  return result;
}