"use client";

import { cn } from "@/lib/utils";
import { ScrollShadow, Tab, Tabs } from "@nextui-org/react";
import { Info, Newspaper, School2, ScrollText, User } from "lucide-react";
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
        defaultSelectedKey={"managements/schools"}
      >
        <Tab
          key={"managements/accounts"}
          title={
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {!isCollapsed && "Tài khoản"}
            </div>
          }
          href="/managements/accounts"
        />
        <Tab
          key={"managements/schools"}
          title={
            <div className="flex items-center gap-2">
              <School2 className="h-4 w-4" />
              {!isCollapsed && "Trường học"}
            </div>
          }
          href="/managements/schools"
        />
        <Tab
          key={"managements/news"}
          title={
            <div className="flex items-center gap-2">
              <Newspaper className="h-4 w-4" />
              {!isCollapsed && "Tin tức"}
            </div>
          }
          href="/managements/news"
        ></Tab>
        <Tab
          key={"managements/feedbacks"}
          title={
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              {!isCollapsed && "Phản hồi"}
            </div>
          }
          href="/managements/feedbacks"
        />
      </Tabs>
    </ScrollShadow>
  );
};
