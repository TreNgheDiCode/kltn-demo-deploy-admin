"use client";

import { SchoolExtend } from "@/types/type";
import { Tab, Tabs } from "@nextui-org/react";
import { SchoolProfile } from "./school-profile";
import { SchoolDescription } from "./school-description";

interface HeadingNavgationProps {
  school: SchoolExtend;
}

export const HeadingNavigation = ({ school }: HeadingNavgationProps) => {
  return (
    <Tabs variant="underlined" className="w-full justify-center">
      <Tab key="profile" title="Thông tin chung">
        <SchoolProfile school={school} />
      </Tab>
      <Tab key="description" title="Giới thiệu">
        <SchoolDescription id={school.id} description={school.description} />
      </Tab>
      <Tab key="history" title="Lịch sử"></Tab>
      <Tab key="location" title="Cơ sở"></Tab>
      <Tab key="education" title="Ngành đào tạo"></Tab>
      <Tab key="gallery" title="Thư viện"></Tab>
      <Tab key="blog" title="Blog"></Tab>
    </Tabs>
  );
};
