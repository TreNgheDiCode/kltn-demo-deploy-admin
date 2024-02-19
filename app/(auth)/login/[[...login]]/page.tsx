import { SignIn } from "@clerk/nextjs";

const LoginPage = () => {
  return <SignIn redirectUrl={"/"} />;
};

export default LoginPage;
