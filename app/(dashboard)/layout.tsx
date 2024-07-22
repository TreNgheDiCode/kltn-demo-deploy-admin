import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { UserMenuDropdown } from "@/components/user-menu-dropdown";
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
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden"
      )}
    >
      <DashboardSidebar />
      <div className="flex flex-1">
        <div className="relative p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
          <div className="z-50 rounded-md fixed px-8 flex h-16 items-center max-w-[calc(100vw-144px)] border-b-2 shadow-md w-full bg-white">
            <h1>Heading</h1>
            <div className="ml-auto">
              <UserMenuDropdown />
            </div>
          </div>
          <div className="pt-20">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
