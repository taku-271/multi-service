import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import md5 from "md5";
import axios from "axios";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "メールアドレスを入力してください",
        },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await axios.post("http://localhost:3001/api/user/signin", {
          email,
        });

        if (user.data && user.data.password === password) {
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

  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        token.user = user;
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  },
});
