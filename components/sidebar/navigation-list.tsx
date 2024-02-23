"use client";

import { cn } from "@/lib/utils";
import { Divider, ScrollShadow, Tab, Tabs } from "@nextui-org/react";
import {
  BadgeInfo,
  CircleUser,
  Grid3X3,
  Pencil,
  School2,
  ScrollText,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Key, useCallback } from "react";

interface NavigationListProps {
  isCollapsed: boolean;
}

export const NavigationList = ({ isCollapsed }: NavigationListProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const subject = searchParams.get("subject") as string;
  const category = searchParams.get("category") as string;

  const onAppend = useCallback(
    (type: "subject" | "category", value: Key) => {
      if (pathname !== "/statistics") return;
      const params = new URLSearchParams(searchParams.toString());
      params.set(type, value.toString());

      router.push("/statistics" + "?" + params.toString());
    },
    [searchParams, pathname, router]
  );

  return (
    <ScrollShadow className="w-full flex flex-col gap-3" hideScrollBar>
      <Tabs
        classNames={{
          base: "w-full",
          tabList: "flex-col flex-1",
          tab: cn("justify-start", isCollapsed && "w-fit"),
          tabContent: "group-data-[selected=true]:font-bold",
        }}
        onSelectionChange={(e) => {
          if (e.toString() === subject) return;
          onAppend("subject", e);
        }}
        defaultSelectedKey={""}
        selectedKey={subject ?? ""}
      >
        <Tab
          key={"profiles"}
          title={
            <div className="flex items-center gap-2">
              <ScrollText className="h-4 w-4" />
              {!isCollapsed && "Hồ sơ"}
            </div>
          }
        ></Tab>
        <Tab
          key={"schools"}
          title={
            <div className="flex items-center gap-2">
              <School2 className="h-4 w-4" />
              {!isCollapsed && "Trường học"}
            </div>
          }
        ></Tab>
      </Tabs>
      <Divider />
      {!isCollapsed && (
        <h1 className="text-primary font-semibold text-sm uppercase">
          Danh mục quản lý
        </h1>
      )}
      <Tabs
        classNames={{
          base: "w-full",
          tabList: "flex-col flex-1",
          tab: cn("justify-start", isCollapsed && "w-fit"),
          tabContent: "group-data-[selected=true]:font-bold",
        }}
        onSelectionChange={(e) => {
          onAppend("category", e);
        }}
        defaultSelectedKey={""}
        selectedKey={category ?? ""}
      >
        <Tab
          key={"list"}
          title={
            <div className="flex items-center gap-2">
              <Grid3X3 className="h-4 w-4" />
              {!isCollapsed && "Thành phần"}
            </div>
          }
        ></Tab>
        <Tab
          key={"accounts"}
          title={
            <div className="flex items-center gap-2">
              <CircleUser className="h-4 w-4" />
              {!isCollapsed && "Học sinh"}
            </div>
          }
        ></Tab>
        <Tab
          key={"posts"}
          title={
            <div className="flex items-center gap-2">
              <Pencil className="h-4 w-4" />
              {!isCollapsed && "Bài viết"}
            </div>
          }
        ></Tab>
        <Tab
          key={"supports"}
          title={
            <div className="flex items-center gap-2">
              <BadgeInfo className="h-4 w-4" />
              {!isCollapsed && "Phản hồi"}
            </div>
          }
        ></Tab>
      </Tabs>
    </ScrollShadow>
  );
};
