import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

const LoginPage = () => {
  return (
    <>
      <Image fill alt="background" src={"/login.jpg"} className="blur-sm" />
      <div className="flex h-full w-full items-center justify-center">
        <SignIn fallbackRedirectUrl={"/"} />
      </div>
    </>
  );
};

export default LoginPage;
