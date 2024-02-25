"use client";

import { SchoolExtend } from "@/types/type";
import { Tab, Tabs } from "@nextui-org/react";
import { SchoolProfile } from "./school-profile";

interface HeadingNavgationProps {
  school: SchoolExtend;
}

export const HeadingNavigation = ({ school }: HeadingNavgationProps) => {
  return (
    <Tabs variant="underlined" className="w-full justify-center">
      <Tab key="profile" title="Thông tin chung">
        <SchoolProfile school={school} />
      </Tab>
      <Tab key="description" title="Giới thiệu"></Tab>
      <Tab key="history" title="Lịch sử"></Tab>
      <Tab key="education" title="Ngành đào tạo"></Tab>
      <Tab key="gallery" title="Thư viện"></Tab>
      <Tab key="blog" title="Blog"></Tab>
    </Tabs>
  );
};
