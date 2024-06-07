import type { NextAuthOptions } from 'next-auth'
import Github from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { fetchUserEmails } from '@/app/lib/data'

export const options: NextAuthOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username:',
          type: 'text',
          placeholder: 'your-cool-username',
        },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: 'your-secret-password',
        },
      },
      async authorize(credentials) {
        // This is where you need to retrieve user data
        // to verify with credentials
        const user = { id: '54', name: 'Rico', password: 'nextauth' }

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        )
          return user

        return null
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const emails = await fetchUserEmails()
      if (user.email && emails.includes(user.email)) return true
      return false
    },
  },
}
