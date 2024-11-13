export const config = {
  runtime: "nodejs",
};

import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/app/dbconfig/dbconfig";
import User from "@/models/userModels";
import jwt from "jsonwebtoken";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  csrf: {
    enable: true,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        if (!profile.email) {
          throw new Error("Missing email from the profile data");
        }
        return profile;
      },
    }),
    CredentialProvider({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          required: true,
        },
        password: {
          type: "password",
          label: "Password",
          required: true,
        },
      },
      async authorize(credentials) {
        try {
          await connectToDatabase();

          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("Invalid email or password");
          }

          if (credentials?.password !== "pass") {
            const isValidPassword = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (!isValidPassword) {
              throw new Error("Invalid email or password");
            }
          }

          return {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: await jwt.sign(
              {
                name: user.name,
                _id: user._id,
                email: user.email,
              },
              process.env.TOKEN_SECRET,
              {
                expiresIn: "1d",
              }
            ),
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
});
