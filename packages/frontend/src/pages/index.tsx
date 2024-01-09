import { Box, Button } from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Index = () => {
  const { push } = useRouter();

  return (
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
  );
};

export default Index;
