import { connectMongo } from "@/lib/db";
import { verifyPassword } from "@/lib/hash";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// export default NextAuth({
export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectMongo();
        const users = client.db().collection("users");
        const user = await users.findOne({ email: credentials.email });
        if (!user) {
          client.close();
          console.log("no such user found");
          throw new Error("no user found in database");
        }
        const isValid = await verifyPassword(
          credentials.password,
          user.password,
        );
        if (!isValid) {
          client.close();
          throw new Error("invalid password");
        }
        client.close();

        return {
          // id: user._id.toString(),
          email: user.email,
          name: user.firstname,
          // lastname: user.lastname,
          // phoneNumber: user.phoneNumber,
          // gender: user.gender,
          // age: user.age,
          // nationality: user.nationality,
        };
      },
    }),
  ],

  // Descriptions in below is for sending info to token and then to session and client
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.lastname = user.lastname;
  //       token.phoneNumber = user.phoneNumber;
  //       token.gender = user.gender;
  //       token.age = user.age;
  //       token.nationality = user.nationality;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     session.user.lastname = token.lastname;
  //     session.user.phoneNumber = token.phoneNumber;
  //     session.user.gender = token.gender;
  //     session.user.age = token.age;
  //     session.user.nationality = token.nationality;
  //     return session;
  //   },
  // },
  // });
};
export default NextAuth(authOptions);
