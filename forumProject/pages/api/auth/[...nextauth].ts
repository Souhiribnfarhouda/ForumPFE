import axios from 'axios';
import { NextApiRequest } from 'next';
import NextAuth from 'next-auth';
import AppleProvider from 'next-auth/providers/apple';
import Credentials from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import LinkedInProvider from 'next-auth/providers/linkedin';

const authorize: any = async (credentials: any, req: NextApiRequest) => {
  const result = await axios.post('http://localhost:9000/api/auth/admin', {
    email: credentials.email,
    password: credentials.password,
  });

  return result.data;
};

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID as string,
      clientSecret: process.env.APPLE_SECRET as string,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID as string,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize,
    }),
  ],

  pages: {
    signIn: '/',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Send the necessary data to your backend endpoint for further processing
      const result = await axios.post(
        'http://localhost:9000/api/auth/callback',
        {
          name: user.name,
          email: user.email,
          image: user.image,
          role: 'user',
        }
      );

      // Return true to proceed with the sign-in
      return result.data;
    },

    async session(props: any) {
      const result = await axios.post(
        'http://localhost:9000/api/auth/callback',
        props.session.user
      );
      return { ...props.session, user: result.data };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    // A secret to use for key generation. Defaults to the top-level secret.
    maxAge: 60 * 60 * 24 * 30,
  },
  debug: true,
});
