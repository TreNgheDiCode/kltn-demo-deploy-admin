"use client";

import { Avatar, Card, CardHeader } from "@nextui-org/react";

export const CompanyLogo = () => {
  return (
    <Card
      classNames={{
        base: "min-h-[104px]",
      }}
    >
      <CardHeader className="flex flex-col items-center justify-center">
        <Avatar src="/logo-red.webp" size="lg" className="bg-transparent" />
        <span className="uppercase text-[#7D101F] font-bold">
          Quan Ly Du Hoc
        </span>
      </CardHeader>
    </Card>
  );
};
