import z from 'zod'

export const signupInput = z.object({
    userName: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().optional(),
    lastName: z.string().optional()
})

//type inference in zod
export type signupInput = z.infer<typeof signupInput>

export const signinInput = z.object({
    userName: z.string().email(),
    password: z.string().min(6),
})

//type inference in zod
export type signinInput = z.infer<typeof signinInput>

export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.number(),
    lastName: z.string().optional()
})

//type inference in zod
export type updateBlogInput = z.infer<typeof updateBlogInput>

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
})
export type CreateBlogInput = z.infer<typeof createBlogInput>