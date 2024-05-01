"use client";

import {
  SchoolExtend,
  SchoolLocationExtend,
  SchoolProgramExtend,
  SchoolStudentExtend,
} from "@/types/type";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { SchoolStudentTable } from "./school-student-table";
import { SchoolDescription } from "./school-description";
import { SchoolHistory } from "./school-history";
import { SchoolLocationTable } from "./school-location-table";
import { SchoolProgramTable } from "./school-program-table";

interface HeadingNavgationProps {
  school: SchoolExtend;
  students: SchoolStudentExtend[];
  locations: SchoolLocationExtend[];
  programs: SchoolProgramExtend[];
}

export const HeadingNavigation = ({
  school,
  students,
  locations,
  programs,
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
          <Tab key="location" title="Cơ sở">
            <SchoolLocationTable locations={locations} />
          </Tab>
          <Tab key="education" title="Ngành đào tạo">
            <SchoolProgramTable programs={programs} />
          </Tab>
          <Tab key="gallery" title="Thư viện"></Tab>
          <Tab key="new" title="Tin tức"></Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
};
