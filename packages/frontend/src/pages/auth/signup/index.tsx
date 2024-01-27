import { useCreateUser } from "@/features/user/hooks/store";
import { Box, Button, FormControl, FormLabel, Input } from "@mui/material";
import md5 from "md5";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const SignIn = () => {
  const initUser = { name: "", email: "", password: "" };

  const { createUser } = useCreateUser();
  const [user, setUser] = useState(initUser);
  const router = useRouter();

  const onChangeUser = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "password") {
      setUser({ ...user, [e.target.name]: md5(e.target.value) });
      return;
    }
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createUser(user);

      await signIn("credentials", {
        redirect: false,
        email: user.email,
        password: user.password,
      }).then((res) => {
        if (res?.error) {
          throw res?.error;
        }
        router.push("/");
      });
    } catch (error) {
      console.error(error);
      return;
    }
  };

  return (
    <Box m="10em">
      <form method="post" onSubmit={onSubmitCreate}>
        <FormControl color="primary" sx={{ width: "100%", mb: 3 }}>
          <FormLabel htmlFor="name">氏名</FormLabel>
          <Input
            type="name"
            name="name"
            id="name"
            onChange={(e) => onChangeUser(e)}
            fullWidth
          />
        </FormControl>
        <FormControl color="primary" sx={{ width: "100%", mb: 3 }}>
          <FormLabel htmlFor="email">メールアドレス</FormLabel>
          <Input
            type="email"
            name="email"
            id="email"
            onChange={(e) => onChangeUser(e)}
            fullWidth
          />
        </FormControl>
        <FormControl color="primary" sx={{ width: "100%", mb: 3 }}>
          <FormLabel htmlFor="password">パスワード</FormLabel>
          <Input
            type="password"
            name="password"
            id="password"
            onChange={(e) => onChangeUser(e)}
            fullWidth
          />
        </FormControl>
        <Button variant="contained" type="submit">
          新規作成
        </Button>
      </form>
    </Box>
  );
};

export default SignIn;
