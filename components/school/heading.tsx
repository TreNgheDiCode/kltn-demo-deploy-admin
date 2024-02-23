"use client";

import { Card, CardHeader } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { SchoolsSelect } from "./schools-select";
import { SchoolLib } from "@/types/type";
import { Bell, MessageCircleMore, Search } from "lucide-react";

const categoryDescription = {
  list: "Quản lý thông tin các bộ phận của trường học",
  accounts: "Quản lý thông tin các học sinh tại trường",
  posts: "Quản lý thông tin các bài đăng",
  supports: "Quản lý các thông tin phản hồi",
};

interface HeadingSchoolProps {
  schools: SchoolLib[];
}

export const HeadingSchool = ({ schools }: HeadingSchoolProps) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") as string;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="hidden lg:flex flex-col gap-2">
          <h1 className="font-semibold text-xl text-primary">
            Quản lý trường học
          </h1>
          {category == "list" && (
            <p className="text-muted-foreground text-sm">
              {categoryDescription["list"]}
            </p>
          )}
          {category == "accounts" && (
            <p className="text-muted-foreground text-sm">
              {categoryDescription["accounts"]}
            </p>
          )}
          {category == "posts" && (
            <p className="text-muted-foreground text-sm">
              {categoryDescription["posts"]}
            </p>
          )}
          {category == "supports" && (
            <p className="text-muted-foreground text-sm">
              {categoryDescription["supports"]}
            </p>
          )}
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
