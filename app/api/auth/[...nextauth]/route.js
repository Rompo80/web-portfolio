import NextAuth from 'next-auth';
import prisma from '@lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
  providers: [
    CredentialsProvider({
  
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          return null;
        }

        const userPassword = user.password;

        const isValidPassword = bcrypt.compareSync(password, userPassword);

        if (!isValidPassword) {
          return null;
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/proofing',
    signOut: '/signout',
  },
  secret: process.env.NEXTAUTH_SECRET,
  
  jwt: {
    encode: async ({ secret, token }) => jwt.sign(token, secret),
    decode: async ({ secret, token }) => jwt.verify(token, secret),
  },
  
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async session(params) {
      if (params.session.user) {
        params.session.user.email = params.token.email;
        params.session.user.id = params.token.id;
      }

      return params.session;
    },
    async jwt(params) {
      if (params.user) {
        params.token.email = params.user.email;
        params.token.id = params.user.id;
      }

      return params.token;
    },
  },
 };

const handler = NextAuth(authOptions);

export { handler as GET,  handler as POST };


