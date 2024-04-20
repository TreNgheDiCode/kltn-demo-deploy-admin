"use client";

import { useUpdateSchoolProfile } from "@/hooks/use-update-school-profile";
import { SchoolExtend } from "@/types/type";
import { Avatar, Button, Card, CardHeader } from "@nextui-org/react";
import { Pencil } from "lucide-react";
import Image from "next/image";

interface SchoolHeaderProps {
  selectSchool: SchoolExtend;
}

export const SchoolHeader = ({ selectSchool }: Readonly<SchoolHeaderProps>) => {
  const { onOpen } = useUpdateSchoolProfile();

  return (
    <Card>
      <CardHeader>
        <div
          className={`relative flex flex-col items-center justify-center w-full h-[35vh] border-5 border-primary gap-2`}
        >
          <Avatar src={selectSchool.logo} className="z-10" size="lg" />
          <h1 className="font-bold text-white dark:text-primary text-4xl z-10 text-center">
            {selectSchool.name}
          </h1>
          <Button
            onClick={() =>
              onOpen({
                isPublished: selectSchool.isPublished,
                name: selectSchool.name,
                id: selectSchool.id,
                logo: selectSchool.logo,
                background: selectSchool.background,
                short: selectSchool.short || "",
                color: selectSchool.color,
              })
            }
            startContent={<Pencil className="size-4" />}
            color="primary"
            variant="shadow"
            className="z-10 absolute right-3 bottom-3 bg-white dark:bg-background text-primary"
          >
            Chỉnh sửa thông tin
          </Button>
          <Image
            alt="school cover"
            src={selectSchool.background}
            fill
            className="absolute object-cover blur-sm"
            quality={100}
            priority
          />
        </div>
      </CardHeader>
    </Card>
  );
};
