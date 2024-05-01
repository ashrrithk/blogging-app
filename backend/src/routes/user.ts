import { Hono } from "hono";
import { sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { signupInput, signinInput } from "../../../common/src/index";

export const userRouter = new Hono<{
    Bindings:{
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }>();

  // Signup
userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "Inputs are not correct"
        })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    try{
      const user = await prisma.user.create({
        data: {
          userName: body.userName,
          password: body.password,
          firstName: body.firstName,
          lastName: body.lastName // Add the missing lastName property
        }
      })
      const jwt = await sign({
        id: user.id
      },c.env.JWT_SECRET)
      return c.text(jwt)
    } catch(e){
      console.log(e)
      c.status(411);
      return c.text('Invalid')
    }
  
  })
  
  //Sign in
userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);
    if(!success){
        c.status(403);
        return c.json({
            message: "Inputs are not correct"
        })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    try{
  
      const user = await prisma.user.findFirst({
        where: {
          userName: body.userName,
          password: body.password
        }
      })
      if(!user){
        c.status(403);//unauthorised
        return c.json({
          message:"Incorrect credentials"
        })
      }
      const jwt = await sign({
        id: user.id
      },c.env.JWT_SECRET)
      return c.text(jwt)
    } catch(e){
      console.log(e)
      c.status(411);
      return c.text('Invalid')
    }
  })