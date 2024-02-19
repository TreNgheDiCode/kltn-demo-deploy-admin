"use client";

import { Divider, ScrollShadow, Tab, Tabs } from "@nextui-org/react";

export const NavigationList = () => {
  return (
    <ScrollShadow className="w-full flex flex-col gap-3" hideScrollBar>
      <h1 className="text-primary font-semibold text-sm uppercase">Quản lý</h1>
      <Tabs
        classNames={{
          base: "w-full",
          tabList: "flex-col flex-1",
        }}
      >
        <Tab key={"profiles"} title={"Hồ sơ"}></Tab>
        <Tab key={"schools"} title={"Trường học"}></Tab>
      </Tabs>
      <Divider />
      <h1 className="text-primary font-semibold text-sm uppercase">
        Tài khoản
      </h1>
      <Tabs
        classNames={{
          base: "w-full",
          tabList: "flex-col flex-1",
        }}
      >
        <Tab key={"accounts"} title={"Tài khoản"}></Tab>
        <Tab key={"posts"} title={"Bài viết"}></Tab>
        <Tab key={"supports"} title={"Phản hồi"}></Tab>
      </Tabs>
    </ScrollShadow>
  );
};
