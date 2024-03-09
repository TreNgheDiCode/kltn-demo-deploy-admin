"use client";

import { Avatar, Card, CardHeader, Image } from "@nextui-org/react";

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
        {isCollapsed ? (
          <>
            <Avatar
              src="/logo_icon_light.png"
              size="lg"
              className="bg-transparent dark:hidden"
            />
            <Avatar
              src="/logo_icon_dark.png"
              size="lg"
              className="hidden bg-transparent dark:block"
            />
          </>
        ) : (
          <>
            <Image
              src="/logo_light.png"
              className="bg-transparent dark:hidden"
              alt="logo"
            />
            <Image
              src="/logo_dark.png"
              className="hidden bg-transparent dark:block"
              alt="logo"
            />
          </>
        )}
      </CardHeader>
    </Card>
  );
};
