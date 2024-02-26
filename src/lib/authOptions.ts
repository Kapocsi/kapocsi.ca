import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";

// DB Stuff
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import { Adapter } from "next-auth/adapters";

export const authOptions = {
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: "Kapocsi <auth@kapocsi.ca>",
    }),
  ],
  pages: {
    signIn: "/signin",
  },
};
