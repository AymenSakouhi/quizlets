import { z } from 'zod'

export const signUpSchema = z
  .object({
    name: z.string(),
    email: z.email({
      message: 'This should be a valid emai',
    }),
    password: z.string().min(8, {
      message: 'Minimum 8 characters',
    }),
    repeatedPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatedPassword, {
    message: '',
    path: ['repeatedPassword'],
  })

export type signUpSchemaType = z.infer<typeof signUpSchema>
