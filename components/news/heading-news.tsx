"use client";

import { Card, CardHeader } from "@nextui-org/react";

export const HeadingNews = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="hidden lg:flex flex-col gap-2">
          <h1 className="font-semibold text-lg text-primary">
            Quản lý tin tức
          </h1>
          <p className="text-muted-foreground text-sm">
            Thêm và chỉnh sửa các tin tức về trường học hoặc công ty
          </p>
        </div>
      </CardHeader>
    </Card>
  );
};
