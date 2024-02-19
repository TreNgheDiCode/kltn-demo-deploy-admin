"use client";

import { NextUIProvider, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Toaster } from "../ui/sonner";

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Spinner size="lg" color="success" label="Đang tải nội dung..." />
      </div>
    );
  }

  return (
    <NextUIProvider className="w-full h-full">
      {children}
      <Toaster />
    </NextUIProvider>
  );
};
