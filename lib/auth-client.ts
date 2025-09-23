import { createAuthClient } from 'better-auth/react'

export const authclient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
})

export const { signIn, signUp, signOut, useSession } = authclient

export const githubSignIn = async () => {
  await signIn.social({
    provider: 'github',
    callbackURL: '/dashboard',
  })
}
