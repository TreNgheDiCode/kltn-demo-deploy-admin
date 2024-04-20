"use client";

import { SchoolLib } from "@/types/type";
import { Card, CardHeader } from "@nextui-org/react";
import { Bell, MessageCircleMore, Search } from "lucide-react";
import { SchoolsSelect } from "./schools-select";

interface HeadingSchoolProps {
  schools: SchoolLib[];
}

export const HeadingSchool = ({ schools }: HeadingSchoolProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="hidden lg:flex flex-col gap-2">
          <h1 className="font-semibold text-lg text-primary">
            Quản lý trường học
          </h1>
          <p className="text-muted-foreground text-sm">
            Quản lý và tùy chỉnh các thông tin liên quan đến trường học
          </p>
        </div>
        <SchoolsSelect schools={schools} />
        <div className="flex items-center gap-3">
          <Search />
          <Bell />
          <MessageCircleMore />
        </div>
      </CardHeader>
    </Card>
  );
};
