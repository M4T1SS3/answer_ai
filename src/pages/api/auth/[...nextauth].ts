import NextAuth from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);



export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
  async authorize(credentials) {
      if (!credentials) {
        console.error('Credentials are undefined');
        return null;
      }

      // Now TypeScript knows credentials is not undefined
      const { data, error } = await supabase
        .from('users')
        .select('id, email, hashed_password')
        .eq('email', credentials.email)
        .single();

      if (error) {
        console.error('Error retrieving user:', error);
        return null;
      }

      if (!data) {
        console.error('No user found');
        return null;
      }

        // Compare the provided password with the hashed password
        const isValid = await bcrypt.compare(credentials.password, data.hashed_password);
        if (isValid) {
          // Return only the necessary user information for the session
          return { id: data.id, email: data.email };
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user id to the JWT token
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  },
  pages: {
    signIn: '/signin', // Custom sign-in page
  }
});