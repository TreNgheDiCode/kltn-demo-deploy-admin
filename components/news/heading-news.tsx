"use client";

import { Button, Card, CardHeader, Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export const HeadingNews = () => {
  const pathname = usePathname();
  const isCreate = pathname.includes("create");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="hidden lg:flex flex-col gap-2">
          <h1 className="font-semibold text-lg text-primary">
            {isCreate ? "Thêm tin tức mới" : "Quản lý tin tức"}
          </h1>
          {!isCreate && (
            <p className="text-muted-foreground text-sm">
              Thêm và chỉnh sửa các tin tức về trường học hoặc công ty
            </p>
          )}
        </div>
        <div>
          {isCreate && (
            <Button
              as={Link}
              href="/managements/news"
              variant="shadow"
              color="primary"
            >
              Quay về danh sách tin tức
            </Button>
          )}
        </div>
      </CardHeader>
    </Card>
  );
};
