import { checkRole } from "@/lib/roles";
import { redirect } from "next/navigation";

export default async function Home() {
  if (!checkRole("ADMIN")) {
    redirect("/unauthorized");
  }

  return <div className="p-3">Home page</div>;
}
