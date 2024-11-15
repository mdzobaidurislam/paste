import User from "./models/userModels";
import jwtJ from "jsonwebtoken";
import connectToDatabase from "./app/dbconfig/dbconfig";

export const authConfig = {
  pages: {
    signIn: "/auth",
    error: "/auth",
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectToDatabase();
        let dbUser = await User.findOne({
          email: profile?.email || user?.email,
        });
        user.picture = profile?.picture || "";
        if (!dbUser) {
          dbUser = await User.create({
            email: profile?.email,
            name: profile?.name || "User",
            picture: profile?.picture,
            isAdmin: false,
          });
        }

        user._id = dbUser._id;
        user.isAdmin = dbUser.isAdmin ? true : false;
        return true;
      } catch (error) {
        console.error("Error during signIn callback:", error);
        return false;
      }
    },

    // Uncomment and modify as necessary for redirect logic
    // async redirect({ url, baseUrl, token }) {
    //   console.log("redirect token====", token);
    //   if (token?.user?.isAdmin) {
    //     return `${baseUrl}/admin/dashboard`;
    //   } else {
    //     return `${baseUrl}/profile`;
    //   }
    // },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      if (isLoggedIn) {
        return true;
      }
      return false;
    },

    async jwt({ user, trigger, session, token }) {
      const tokenSecret =
        process.env.TOKEN_SECRET || "U29tZVN0cm9uZ1Rva2VuMTIzNDU2";
      if (user) {
        token.user = {
          ...user,
          _id: user?._id,
          name: user?.name,
          email: user?.email,
          isAdmin: user?.isAdmin,
          picture: user?.picture,
          token: await jwtJ.sign(
            {
              _id: user._id,
              email: user.email,
            },
            tokenSecret,
            {
              expiresIn: "1d",
            }
          ),
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      session.user.picture = token.picture || undefined;
      return session;
    },
  },

  providers: [], // Add providers with an empty array for now
  trustHost: true,
};
