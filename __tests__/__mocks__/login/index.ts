import { LoginFakeData } from "@/__tests__/__fixtures__/login";
import { LoginData } from "@/app/login/page";
import {RestRequest, ResponseComposition, RestContext } from 'msw'


export const mockLoginApi = async (req:RestRequest, res:ResponseComposition, ctx:RestContext)=>{
    const { email, password } = await req.json() as LoginData
    const {email:invalidEmail,password:invalidPassword}= LoginFakeData.invalidCredentials;
  
    if (email === invalidEmail && password === invalidPassword) {
      return res(
        ctx.status(401),
        ctx.json({
          error: "Invalid credentials",
        })
      );     
    } else {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
        })
      );     
    }
}