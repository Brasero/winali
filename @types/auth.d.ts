import {DefaultSession} from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      first_name: string;
      last_name: string;
      is_email_verified: boolean;
      is_seller: boolean;
      role: 'user' | 'admin';
    } & DefaultSession["user"];
  }
}