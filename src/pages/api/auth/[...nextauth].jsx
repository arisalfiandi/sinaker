import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import argon2 from 'argon2'

import prisma from '../../../services/db'

const authOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        name: {
          label: 'username',
          type: 'text'
        },
        password: {
          label: 'Password',
          type: 'password'
        },
        email: {
          label: 'Email',
          type: 'email'
        }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials

        // perform you login logic
        // find out user from db
        const user = await prisma.user.findUnique({
          where: {
            email: email
          }
        })

        if (!user) {
          prisma.$disconnect()
          throw new Error('invalid credentials')
        }
        let validkan = false
        const apakah = (pwLogin, pwDb) => {
          pwLogin === pwDb ? (validkan = true) : (validkan = false)
        }

        apakah(user.password, password)
        // const isValid = await verify(user.password, password)
        // const isValid = true
        if (!validkan) {
          prisma.$disconnect()

          throw new Error('invalid credentials')
        }

        return user
      }
    })
  ],
  secret: 'ko/XuIWVx3wD9m9+7FaPTBahJl70czxugHuc/HmCxXg=',
  pages: {
    signIn: '/pages/login',
    error: '/auth/error'
  },
  callbacks: {
    jwt(params) {
      // update token
      // if (params.user?.role) {
      //   params.token.role = params.user.role
      // }

      if (params.user?.id) {
        params.token.uid = params.user.id
      }

      // return final_token
      return params.token
    },
    session: async ({ session, token }) => {
      // session.role = token.role
      session.uid = token.uid

      return session
    }
  },
  jwt: {
    secret: 'JaWASDfSDRLVDWQRMRAWKOK',
    maxAge: 60 * 60 * 24 * 30
  }
}

export default NextAuth(authOptions)
