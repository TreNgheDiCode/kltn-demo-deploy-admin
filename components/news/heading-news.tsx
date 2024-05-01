"use client";

import { Button, Card, CardHeader, Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export const HeadingNews = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const isCreate = pathname.includes("create");
  const hasSubPath = parts.length > 3;
  console.log(parts.length);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="hidden lg:flex flex-col gap-2">
          <h1 className="font-semibold text-lg text-primary">
            {!hasSubPath && "Quản lý tin tức"}
            {isCreate && "Thêm tin tức mới"}
            {!isCreate && hasSubPath && "Cập nhật tin tức"}
          </h1>
        </div>
        <div>
          {hasSubPath && (
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
