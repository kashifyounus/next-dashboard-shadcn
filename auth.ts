import axios from "axios";
import type { NextAuthConfig } from "next-auth";
import NextAuth, { AuthError } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from 'jsonwebtoken';
import { ClaimTypes } from "./types/identityClaims";

export const config = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req): Promise<any> {
        try {
          const response = await axios.post("https://localhost:7092/login", {
            email: credentials.email, //"user@example.com",
            password: credentials.password, //"User@123",
          });
          //console.log("response.data", response.data);
          const { user, token } = response.data;
          if (!user && !token) {
            return null;
          }
          return response.data;
        } catch (error: any) {
          ///console.log("authorize error", error);
          if (error.response && error.response.status === 401) {
            throw new Error(error.response.data);
          }
          throw new Error("Server Error", error);
        }
      },
    }),
  ],
  // this is required
  secret: process.env.AUTH_SECRET,
  // our custom login page
  pages: {
    signIn: "/auth/sigin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  callbacks: {
    async authorized({ request, auth }) {
      //console.log("authorized request", request);
      //console.log("authorized auth", auth);
      const { pathname } = request.nextUrl
      // get the route name from the url such as "/about"
      const searchTerm = request.nextUrl.pathname.split("/").slice(0, 2).join("/")
      //console.log("searchTerm auth", searchTerm);
      return !!auth;
    },

    // this run only once when the user is logged in
    async jwt({ token , user}) {
      //console.log("jwt token 1", token);
      if (user) {
        console.log("jwt user", user);
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.token as string;
        token.roles = user.userRoles
        token.exp = user.expiration
      }
      return token;
    },
    async session({ session, token }) {
      //console.log("session 2 token", token);
      session.accessToken = token.accessToken;
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        roles: token.roles,
        exp: token.exp
      };
      return session;
    },
  },
  //debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig;

export const { auth, handlers, signIn, signOut } = NextAuth(config);
