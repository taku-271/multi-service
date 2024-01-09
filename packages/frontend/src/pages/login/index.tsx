import { signIn, signOut, useSession } from "next-auth/react";

const login = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <h1>Hello {session.user?.name}！</h1>
        <h1>Hello {session.user?.email}！</h1>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default login;
