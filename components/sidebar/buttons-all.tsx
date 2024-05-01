"use client";

import { cn } from "@/lib/utils";
import { Button, Link } from "@nextui-org/react";
import { LayoutDashboard, LayoutList } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface ButtonsAllProps {
  isCollapsed: boolean;
}

export const ButtonsAll = ({ isCollapsed }: ButtonsAllProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const onClick = () => {
    router.push("/managements/accounts");
  };

  return (
    <div className={cn("flex flex-col gap-3", isCollapsed && "items-center")}>
      <Button
        startContent={<LayoutDashboard className="w-4 h-4" />}
        as={Link}
        color={pathname === "/" ? "primary" : undefined}
        variant={pathname === "/" ? "shadow" : "light"}
        className={cn(
          "items-center flex-row justify-start text-sm",
          isCollapsed && "w-fit min-w-0"
        )}
        size="sm"
        href="/"
      >
        {!isCollapsed && "Bảng điều khiển"}
      </Button>
      <Button
        onClick={onClick}
        startContent={<LayoutList className="w-4 h-4" />}
        color={pathname.startsWith("/managements") ? "primary" : undefined}
        variant={pathname.startsWith("/managements") ? "shadow" : "light"}
        className={cn(
          "items-center flex-row justify-start text-sm",
          isCollapsed && "w-fit min-w-0"
        )}
        size="sm"
      >
        {!isCollapsed && "Quản lý"}
      </Button>
    </div>
  );
};
