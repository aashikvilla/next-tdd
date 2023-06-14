import { LoginData } from '@/app/login/page'
import { rest } from 'msw'
import { LoginConstants } from '../__utils__/testConstants'


export const handlers = [
  rest.post('https://demo9689581.mockable.io/auth/login', async (req, res, ctx) => {

    const { email, password } = await req.json() as LoginData
    const {email:validEmail,password:validPassword}= LoginConstants.validCredentials;
  
    if (email === validEmail && password === validPassword) {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
        })
      );
    } else {
      return res(
        ctx.status(401),
        ctx.json({
          error: "Invalid credentials",
        })
      );
    }
  })
]
