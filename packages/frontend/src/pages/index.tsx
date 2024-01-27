import { Box, Button, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Index = () => {
  const { push } = useRouter();
  const { data: session } = useSession();

  return (
    <Box textAlign="center" mt="10em">
      <Typography variant="h4">ようこそ {session?.user?.name} !</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "middle",
          m: 5,
        }}
      >
        <Button variant="contained" onClick={() => push("/schedule")}>
          スケジュール管理
        </Button>
        <Button onClick={() => signOut()}>サインアウト</Button>
      </Box>
    </Box>
  );
};

export default Index;
