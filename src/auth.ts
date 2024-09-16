import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import dbConnect from "./lib/dbConnect";
import User from "./models/User";
import { compare } from "bcryptjs";
import Google from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET,
      
    }),
    Credentials({
      name: 'Credentials',

      credentials:{
        email: {label: "Email", type: "email"},
        password: {label: "Password", type: "password"},

      },
      
      authorize: async (credentials) =>{
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;
        if(!email || !password){
          throw new CredentialsSignin('Please provide both email and password')
        }

        await dbConnect();

        const user = await User.findOne({email}).select("+password+role");

        if(!user){
          throw new CredentialsSignin('Invalid email or password')
          
        }
        if(!user.password){
          throw new Error("Invalid email or password");

        }
        const isMatched = await compare(password,user.password)
        if(!isMatched){
          throw new Error("Invalid password");
        }
        const userData = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role:user.role,
          id: user.id,
        }
        return userData;
      }
    })
  ],
  pages:{
    signIn:"/login",
  },
  callbacks: {
    async session({ session, token }: { session: any, token: JWT }) {
      if (token?.sub && token.role) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT, user?: any }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  
    async signIn({ user, account }) {
    if (account?.provider === "google") {
      try {
        const { email, name, image, id } = user;
        await dbConnect();
        const alreadyUser = await User.findOne({ email });

        if (!alreadyUser) {
          await User.create({ email, name, image, authProviderId: id });
        } else {
          return true;
        }
      } catch (error) {
        throw new Error("Error while creating user");
      }
    }

    if (account?.provider === "credentials") {
      return true;
    } else {
      return false;
    }
  },
},
}
);