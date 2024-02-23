"use client";

import { cn } from "@/lib/utils";
import { Button, Link } from "@nextui-org/react";
import { LayoutDashboard, LayoutList } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ButtonsAllProps {
  isCollapsed: boolean;
}

export const ButtonsAll = ({ isCollapsed }: ButtonsAllProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onClick = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("subject", "profiles");
    params.set("category", "list");

    router.push("/statistics/profiles" + "?" + params.toString());
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
        color={pathname.startsWith("/statistics") ? "primary" : undefined}
        variant={pathname.startsWith("/statistics") ? "shadow" : "light"}
        className={cn(
          "items-center flex-row justify-start text-sm",
          isCollapsed && "w-fit min-w-0"
        )}
        size="sm"
      >
        {!isCollapsed && "Thống kê"}
      </Button>
    </div>
  );
};
