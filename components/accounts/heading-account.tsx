"use client";

import { Button, Card, CardHeader, Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export const HeadingAccount = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="hidden lg:flex flex-col gap-2">
          <h1 className="font-semibold text-lg text-primary">
            Quản lý tài khoản
          </h1>
        </div>
      </CardHeader>
    </Card>
  );
};
