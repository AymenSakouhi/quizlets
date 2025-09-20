import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { LoginForm } from '@/components/login-form'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) return <LoginForm />

  return (
    <div>
      You are logged in
      <button
        onClick={() => {
          redirect('/dashboard')
        }}
      >
        Head to app
      </button>
    </div>
  )
}
