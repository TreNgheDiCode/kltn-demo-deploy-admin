"use client";

import { StudentLib } from "@/types/type";
import { Tab, Tabs } from "@nextui-org/react";

interface StudentNavigationProps {
  student: StudentLib;
}

export const StudentNavigation = ({
  student,
}: Readonly<StudentNavigationProps>) => {
  return (
    <Tabs
      variant="underlined"
      className="w-full"
      classNames={{ tabList: "flex-1" }}
    >
      <Tab key="scores" title="Điểm số"></Tab>
      <Tab key="posts" title="Bài đăng"></Tab>
      <Tab key="contacts" title="Liên hệ & Hỗ trợ"></Tab>
    </Tabs>
  );
};
