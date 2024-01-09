import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Typography,
} from "@mui/material";
import { GetServerSideProps } from "next";
import { getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";

type SignInProps = {
  csrfToken?: string;
};

const SignIn = ({ csrfToken }: SignInProps) => {
  const router = useRouter();
  const { error } = router.query;

  return (
    <Box padding="20%">
      <Typography variant="h3" mb="1em">
        ログイン
      </Typography>
      <form method="post" action="/api/auth/callback/credentials">
        <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <FormControl color="primary" sx={{ width: "100%", mb: 3 }}>
          <FormLabel htmlFor="title">メールアドレス</FormLabel>
          <Input type="email" name="email" fullWidth />
        </FormControl>
        <FormControl color="primary" sx={{ width: "100%", mb: 3 }}>
          <FormLabel htmlFor="title">パスワード</FormLabel>
          <Input type="password" name="password" fullWidth />
        </FormControl>
        {error && (
          <Typography color="red" mb="1em">
            メールアドレスまたはパスワードが違います。
          </Typography>
        )}
        <Button type="submit" variant="contained" sx={{ mr: "10%" }}>
          サインイン
        </Button>
        <Button onClick={() => router.push("/auth/signup")} variant="contained">
          新規登録
        </Button>
      </form>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
};

export default SignIn;
