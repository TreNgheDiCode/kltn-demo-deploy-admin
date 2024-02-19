import { checkRole } from "@/lib/roles";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  if (!checkRole("ADMIN")) {
    redirect("/unauthorized");
  }

  return <div>Home page</div>;
}
