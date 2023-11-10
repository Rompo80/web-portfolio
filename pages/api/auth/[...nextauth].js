import NextAuth from 'next-auth';
import { PrismaClient } from '@prisma/client';
import CredentialsProvider from 'next-auth/providers/credentials';
//import { PrismaAdapter } from "@next-auth/prisma-adapter";
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

export const authOptions = {
    providers: [

        CredentialsProvider({
            name: "Client Sign In",
            credentials: {
                email: {label: "Username", type: "email", placeholder: "example@gmail.com"}
            },
            async authorize(credentials, req) {
                const dbUser = await prisma.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                })
                if(dbUser){
                if(dbUser.password == credentials.password){
                    return dbUser;
                }
            }
            return null

        }
    })
  ],
  pages: {
    signIn: '/proofing',
  },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };




// const authOptions = {
//     adapter: PrismaAdapter(prisma),
//     callbacks: {
//       async signIn(params) {
//         return true;
//       },
//       async session({ session, token }) {
//         if (session.user?.name) session.user.name = token.name;
//         return session;
//       },
//       async jwt({ token, user }) {
//         let newUser = { ...user };
//         if (newUser.first_name && newUser.last_name)
//           token.name = `${newUser.first_name} ${newUser.last_name}`;
//         return token;
//       },
//     },

//     providers: [
//         CredentialsProvider({
//             name: 'Credentials',
//             credentials: {
//               email: { label: 'email', type: 'text' },
//               password: { label: 'Password', type: 'password' },
//             },
//             async authorize(credentials, req) {
//               const user = await prisma.user.findUnique({
//                 where: { email: credentials?.email },
//               });
//               if (user) {
//                 if (user.provider !== 'Credentials')
//                   throw new Error(`Please sign in with ${user.provider}`);
      
//                 const matchingPassword =
//                   user.password &&
//                   credentials?.password &&
//                   (await bcrypt.compare(credentials.password, user.password));
      
//                 if (!matchingPassword)
//                   throw new Error('Incorrect Username or Password');
//                 return user;
//               }
      
//               throw new Error('User does not exist');
//             },
//           }),
//         ],
//         secret: config.NEXTAUTH_SECRET,
//         session: { strategy: 'jwt' },
//       };
      
//       const handler = NextAuth(authOptions);


//       export { handler as GET, handler as POST };































// export default NextAuth({
//   providers: [
//     CredentialsProvider({
      
//       name: 'my-project',
      
//       credentials: {
//         email: {
//           label: 'Email',
//           type: 'email',
//           placeholder: 'jsmith@example.com',
//         },
//         password: { label: 'Password', type: 'password' }
//       },
//       async authorize(credentials, req) {
//         const user = await prisma.user.findUnique({
//           where: { email: credentials?.email },
//         })

//         if (user && validatePassword(user, credentials.password)) {
//           return {
//             id: user.id,
//             name: user.name,
//             email: user.email,
//           }
//         }
//         if (!res.ok) {
//             //   throw new Error(user.message);
//         }
//         // Return null if user data could not be retrieved
//         return null
//       },
//     }),

   
    // ...add more providers here
//   ],
//   adapter: PrismaAdapter(prisma),
//   secret: process.env.JWT_SECRET,
//   pages: {
//     signIn: '/proofing',
//   },

//   session: {
//     strategy: "database", 
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//     updateAge: 24 * 60 * 60, // 24 hours
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         return {
//           ...token,
//           accessToken: user.token,
//           refreshToken: user.refreshToken,
//         };
//       }

//       return token;
//     },

//     async session({ session, token }) {
//       session.user.accessToken = token.accessToken;
//       session.user.refreshToken = token.refreshToken;
//       session.user.accessTokenExpires = token.accessTokenExpires;

//       return session;
//     },
//   },

  // Enable debug messages in the console if you are having problems
//   debug: process.env.NODE_ENV === 'development',
// });




