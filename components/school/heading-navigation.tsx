"use client";

import { SchoolExtend, SchoolStudentExtend } from "@/types/type";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { SchoolStudentTable } from "./school-student-table";
import { SchoolDescription } from "./school-description";
import { SchoolHistory } from "./school-history";

interface HeadingNavgationProps {
  school: SchoolExtend;
  students: SchoolStudentExtend[];
}

export const HeadingNavigation = ({
  school,
  students,
}: HeadingNavgationProps) => {
  return (
    <Card>
      <CardBody>
        <Tabs variant="underlined" className="w-full justify-center">
          <Tab key="profile" title="Học sinh">
            <SchoolStudentTable students={students} />
          </Tab>
          <Tab key="description" title="Giới thiệu">
            <SchoolDescription
              id={school.id}
              description={school.description}
            />
          </Tab>
          <Tab key="history" title="Lịch sử">
            <SchoolHistory id={school.id} history={school.history} />
          </Tab>
          <Tab key="location" title="Cơ sở"></Tab>
          <Tab key="education" title="Ngành đào tạo"></Tab>
          <Tab key="gallery" title="Thư viện"></Tab>
          <Tab key="blog" title="Blog"></Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
};
