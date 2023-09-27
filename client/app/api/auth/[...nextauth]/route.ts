import { ADD_USER_ROUTE } from "@/utils/apiRoutes";
import axios from "axios";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const authOption: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user }) {
      try {
        await axios.post(ADD_USER_ROUTE, {
          email: user.email,
          name: user.name,
          image: user.image,
        });
      } catch (error) {
        console.log(error);
      }
      return true;
    },
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
