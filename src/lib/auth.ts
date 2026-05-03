import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .single();

        if (error || !user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) return null;

      
        return { id: user.id, email: user.email, name: user.name, image: user.image };
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const { data: existing } = await supabase
          .from("users")
          .select("id")
          .eq("email", user.email!)
          .single();

        if (existing) {

          user.id = existing.id;
        } else {
          const { data: created, error: insertError } = await supabase
            .from("users")
            .insert({
              email: user.email,
              name: user.name,
              image: user.image,
            })
            .select("id")
            .single();

          if (insertError || !created) return "/error";

          user.id = created.id; 
        }
      }

      return true;
    },

    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user?.id) {
        token.supabaseId = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
};