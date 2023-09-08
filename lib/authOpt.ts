import { NextAuthOptions } from "next-auth";

import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
          clientId: process.env.GITHUB_CLIENT_ID as string,
          clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Username", type: "text", placeholder: "Indiana Jones" },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials) {
    
            // Checking if credentials are valid
            if (!credentials?.email || !credentials?.password) {
              throw new Error('Invalid credentials');
            }
    
            const user = await prisma.user.findUnique({
              where: {
                email: credentials.email
              }
            });
    
            // Checking if user was found
            if (!user || !user?.hashedPassword) {
              throw new Error('No user found');
            }
    
            // Checking password match
            const isCorrectPassword = await bcrypt.compare(
              credentials.password,
              user.hashedPassword
            );
    
            if (!isCorrectPassword) {
              throw new Error('Incorrect password');
            }
    
            return user;
          },
        }),
      ],
      debug: process.env.NODE_ENV === 'development',
      session: {
        strategy: 'jwt',
      },
      jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
      },
      secret: process.env.NEXTAUTH_SECRET,
      
      // pages: {
      //   signIn: '/auth/signin',
      //   signOut: '/auth/signout',
      //   error: '/auth/error', // Error code passed in query string as ?error=
      //   verifyRequest: '/auth/verify-request', // (used for check email message)
      //   newUser: '/auth/register' // New users will be directed here on first sign in (leave the property out if not of interest)
      // }
}