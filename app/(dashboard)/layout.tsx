import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Navbar } from "@/components/navbar";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
};

export const metadata = {
  title: "Bảng điều khiển | CANADA MEDICAL AND EDUCATION",
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto"
      )}
    >
      <DashboardSidebar />
      <div className="flex flex-1">
        <div className="relative p-2 md:px-10 pt-10 pb-4 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-background flex flex-col gap-2 flex-1 w-full h-full max-h-screen overflow-auto">
          <div className="flex-1 mb-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
