import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import axios from 'axios';
import admin from './app/lib/firebase-admin';

const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    }),
    CredentialProvider({
      credentials: {
        email: {
          type: 'email'
        },
        password: {
          type: 'password'
        }
      },
      async authorize(credentials, req) {
        console.log('authrize called');
        //const db = admin.firestore();
        try {
          const url = process.env.NEXTAUTH_URL || 'http://localhost:3000';
          const response = await axios.post(`${url}/api/users/signin`, {
            email: credentials?.email as string,
            password: credentials?.password as string
          });
          //console.log(response.data);
          return response.data;
        } catch (e) {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/' //sigin page
  }
} satisfies NextAuthConfig;

export default authConfig;
