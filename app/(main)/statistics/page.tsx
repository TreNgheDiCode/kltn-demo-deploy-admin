import { checkRole } from "@/lib/roles";
import { redirect } from "next/navigation";

interface StatisticsPageProps {
  searchParams?: { [key: string]: string };
}

const StatisticsPage = async ({ searchParams }: StatisticsPageProps) => {
  if (!checkRole("ADMIN")) {
    redirect("/unauthorized");
  }

  return (
    <div className="p-3 ml-72">
      Statistics Page: {searchParams?.subject}, {searchParams?.category}
    </div>
  );
};

export default StatisticsPage;
