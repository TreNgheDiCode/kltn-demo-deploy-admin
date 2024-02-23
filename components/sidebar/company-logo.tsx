"use client";

import { Avatar, Card, CardHeader } from "@nextui-org/react";

interface CompanyLogoProps {
  isCollapsed: boolean;
}

export const CompanyLogo = ({ isCollapsed }: CompanyLogoProps) => {
  return (
    <Card
      classNames={{
        base: !isCollapsed && "min-h-[104px]",
      }}
    >
      <CardHeader className="flex flex-col items-center justify-center">
        <Avatar src="/logo-red.webp" size="lg" className="bg-transparent" />
        {!isCollapsed && (
          <span className="uppercase text-[#7D101F] font-bold">
            Quan Ly Du hoc
          </span>
        )}
      </CardHeader>
    </Card>
  );
};
