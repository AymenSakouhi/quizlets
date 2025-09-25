import { z } from 'zod'

const signUpSchema = z
  .object({
    name: z.string().min(2, 'Minimum 2 characters'),
    email: z.email({
      message: 'This should be a valid email',
    }),
    password: z.string().min(8, {
      message: 'Minimum 8 characters',
    }),
    repeatedPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatedPassword, {
    message: 'Passwords are not identical',
    path: ['repeatedPassword'],
  })

const signInSchema = z.object({
  email: z.email({
    message: 'This should be a valid email',
  }),
  password: z.string().min(8, {
    message: 'Minimum 8 characters',
  }),
})

export type SignUpSchemaType = z.infer<typeof signUpSchema>
export type SignInSchemaType = z.infer<typeof signInSchema>

export { signUpSchema, signInSchema }
