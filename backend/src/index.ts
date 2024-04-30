import { Hono } from 'hono'
import { sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono<{
  Bindings:{
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>()


app.post('/api/v1/user/signup', async (c) => {
  const body = await c.req.json();
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

app.post('/api/v1/user/signin', async (c) => {
  const body = await c.req.json();
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

app.post('/api/v1/blog', (c) => {
  return c.text('Hello Blog!')
})

app.put('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/v1/blog', (c) => {
  return c.text('Hello Blog2!')
})

app.get('/api/v1/blog/blog', (c) => {
  return c.text('Hello Hono!')
})
export default app

//postgresql://default_owner:************@ep-plain-surf-a1y8lc6r-pooler.ap-southeast-1.aws.neon.tech/default?sslmode=require

//DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZDFmM2U4ODItMGM1Mi00NDk5LWFiZDktZmFmMWQwNDA2MzkxIiwidGVuYW50X2lkIjoiOTdhZGIwNTk4MmVkMzk1NDRiZmExYWU0MDhjMDVjNDIxMjg2MTljYTMxMTA4ZmE0MTE4MWFkMzMzYmRkMDBlMyIsImludGVybmFsX3NlY3JldCI6ImUwMGIyN2IzLTI1MTgtNGNiZS1iYjAxLTc2YmRkMDFiOWE5YiJ9.5CK3jKUGwOs8Emrq8f3MmNsW6cJKrRjZRveDU8kdJDQ"