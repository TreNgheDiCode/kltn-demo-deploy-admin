"use client";

import { Button, Divider, Link } from "@nextui-org/react";
import { Settings, Sheet } from "lucide-react";
import { CompanyLogo } from "./company-logo";
import { NavigationList } from "./navigation-list";
import { UserMenu } from "./user-menu";

export const Sidebar = () => {
  return (
    <div className="w-72 p-3 h-full flex flex-col bg-gray-100 gap-3 rounded-r-3xl dark:bg-primary shadow-2xl">
      <CompanyLogo />
      <NavigationList />
      <Divider />
      <h1 className="text-primary font-semibold text-sm uppercase">Công cụ</h1>
      <Button
        startContent={<Sheet className="w-4 h-4" />}
        as={Link}
        variant="light"
        className="items-center flex-row justify-start text-sm"
        size="sm"
      >
        Lập báo cáo
      </Button>
      <Button
        startContent={<Settings className="w-4 h-4" />}
        as={Link}
        variant="light"
        className="items-center flex-row justify-start py-0 text-sm"
        size="sm"
      >
        Cài đặt
      </Button>
      <div className="mt-auto">
        <UserMenu />
      </div>
    </div>
  );
};
