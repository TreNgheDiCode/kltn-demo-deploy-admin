"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { School } from "@prisma/client";
import { SchoolProfile } from "./school-profile";

interface HeadingNavgationProps {
  school: School;
}

export const HeadingNavigation = ({ school }: HeadingNavgationProps) => {
  return (
    <Tabs variant="underlined" className="w-full justify-center">
      <Tab key="profile" title="Thông tin chung">
        <SchoolProfile school={school} />
      </Tab>
      <Tab key="location" title="Vị trí"></Tab>
      <Tab key="education" title="Ngành đào tạo"></Tab>
      <Tab key="gallery" title="Thư viện"></Tab>
      <Tab key="blog" title="Blog"></Tab>
    </Tabs>
  );
};
