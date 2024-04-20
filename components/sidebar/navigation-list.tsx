"use client";

import { cn } from "@/lib/utils";
import { ScrollShadow, Tab, Tabs } from "@nextui-org/react";
import { Info, School2, ScrollText } from "lucide-react";
import { usePathname } from "next/navigation";

interface NavigationListProps {
  isCollapsed: boolean;
}

export const NavigationList = ({ isCollapsed }: NavigationListProps) => {
  const pathname = usePathname();

  return (
    <ScrollShadow className="w-full flex flex-col gap-3" hideScrollBar>
      <Tabs
        classNames={{
          base: "w-full",
          tabList: "flex-col flex-1",
          tab: cn("justify-start", isCollapsed && "w-fit"),
          tabContent: "group-data-[selected=true]:font-bold",
        }}
        selectedKey={pathname.split("/").slice(1, 3).join("/")}
      >
        <Tab
          key={"manangements/profiles"}
          title={
            <div className="flex items-center gap-2">
              <ScrollText className="h-4 w-4" />
              {!isCollapsed && "Hồ sơ"}
            </div>
          }
          href="/manangements/profiles"
        ></Tab>
        <Tab
          key={"manangements/schools"}
          title={
            <div className="flex items-center gap-2">
              <School2 className="h-4 w-4" />
              {!isCollapsed && "Trường học"}
            </div>
          }
          href="/manangements/schools"
        ></Tab>
        <Tab
          key={"manangements/contacts"}
          title={
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              {!isCollapsed && "Phản hồi"}
            </div>
          }
          href="/manangements/contacts"
        ></Tab>
      </Tabs>
    </ScrollShadow>
  );
};
