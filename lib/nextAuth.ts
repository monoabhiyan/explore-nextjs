// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        try {
          const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', {
            email: credentials.email,
            password: credentials.password
          });

          if (response.data && response.data.access_token) {
            // Return user data in the expected format for NextAuth
            const {data} = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
              headers: {
                Authorization: `Bearer ${response.data.access_token}`
              }
            });
            data.user_access_token = response.data.access_token;
            return data;
          }

          return null;
        } catch {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({token, user, account}) {
      if (user) {
        token.id = user.id
      }
      if (account?.provider === 'credentials') {
        return {
          ...token,
          accessToken: user.user_access_token
        }
      }
      return token
    },
    async session({session, token}) {
      session.user.id = token.id
      session.accessToken = token.accessToken
      return session
    }
  },
  pages: {
    signIn: '/signin'
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET as string
}

export const nextAuthHandlers = NextAuth(authOptions);
