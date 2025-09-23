'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signUp, githubSignIn } from '@/lib/auth-client'
import { signUpSchema, signUpSchemaType } from '@/types/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      repeatedPassword: '',
    },
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = ({ name, email, password }: signUpSchemaType) => {
    const userData = {
      name,
      email,
      password,
    }
    signUp.email({
      ...userData,
      callbackURL: '/signin',
    })
    alert(JSON.stringify(userData))
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Sign up for a new account</CardTitle>
          <CardDescription>Enter your future credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Input
                      id="name"
                      type="name"
                      placeholder="John"
                      {...field}
                    />
                  )}
                />
                {errors.name && (
                  <span className="text-red-700">{errors.name?.message}</span>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...field}
                    />
                  )}
                />
                {errors.email && (
                  <span className="text-red-700">{errors.email?.message}</span>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Input id="password" type="password" {...field} />
                  )}
                />
                {errors.password && (
                  <span className="text-red-700">
                    {errors.password?.message}
                  </span>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="repeatedPassword">Password again</Label>
                </div>
                <Controller
                  name="repeatedPassword"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Input id="repeatedPassword" type="password" {...field} />
                  )}
                />
                {errors.repeatedPassword && (
                  <span className="text-red-700">
                    {errors.repeatedPassword?.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Sign up
                </Button>
                <Button
                  onClick={() => {
                    githubSignIn()
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Login with Github instead
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              you have an account?{' '}
              <a href="#" className="underline underline-offset-4">
                Sign in
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
