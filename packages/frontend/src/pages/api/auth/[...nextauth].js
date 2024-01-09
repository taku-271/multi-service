import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import md5 from "md5";
import axios from "axios";
import { exit } from "process";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "メールアドレス",
          type: "email",
          placeholder: "メールアドレスを入力してください",
        },
        password: { label: "パスワード", type: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials;

        const hashedPassword = md5(password);

        const user = await axios.post("http://localhost:3001/api/user/signin", {
          email,
        });

        if (user.data && user.data.password === hashedPassword) {
          return user.data;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
});
