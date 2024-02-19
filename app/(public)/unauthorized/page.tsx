"use client";

import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function UnauthenticatedPage() {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-2">
      Bạn không có quyền xem nội dung này
      <Button onClick={() => signOut(() => router.push("/login"))}>
        Đăng nhập
      </Button>
    </div>
  );
}
