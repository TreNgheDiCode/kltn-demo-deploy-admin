"use client";

import { SignOutButton, useAuth, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function UnauthenticatedPage() {
  const { signOut } = useAuth();
  const router = useRouter();
  const onClick = useCallback(() => {
    signOut(() => router.push("/login"));
  }, [signOut, router]);
  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-2">
      Bạn không có quyền xem nội dung này
      <SignOutButton>
        <button onClick={onClick}>Đăng nhập</button>
      </SignOutButton>
    </div>
  );
}
