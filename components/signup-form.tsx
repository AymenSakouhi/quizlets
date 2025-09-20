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

  const onSubmit = async (data: signUpSchemaType) => {
    alert(JSON.stringify(data))
    await signUp.email({
      name: 'Aymen',
      email: data.email,
      password: data.password,
      callbackURL: '/signIn',
    })
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
