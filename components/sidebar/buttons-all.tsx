"use client";

import { Button, Link } from "@nextui-org/react";
import { LayoutDashboard, LayoutList } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const ButtonsAll = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onClick = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("subject", "profiles");
    params.set("category", "accounts");

    router.push("/statistics" + "?" + params.toString());
  };

  return (
    <div className="flex flex-col gap-3">
      <Button
        startContent={<LayoutDashboard className="w-4 h-4" />}
        as={Link}
        color={pathname === "/" ? "primary" : undefined}
        variant={pathname === "/" ? "shadow" : "light"}
        className="items-center flex-row justify-start text-sm"
        size="sm"
        href="/"
      >
        Bảng điều khiển
      </Button>
      <Button
        onClick={onClick}
        startContent={<LayoutList className="w-4 h-4" />}
        color={pathname === "/statistics" ? "primary" : undefined}
        variant={pathname === "/statistics" ? "shadow" : "light"}
        className="items-center flex-row justify-start text-sm"
        size="sm"
      >
        Thống kê
      </Button>
    </div>
  );
};
