import { z } from 'zod'

export const signUpSchema = z
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

export type signUpSchemaType = z.infer<typeof signUpSchema>
