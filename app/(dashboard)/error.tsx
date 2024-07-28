"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex size-full justify-normal items-center flex-col gap-4">
      <h2 className="text-4xl font-bold text-main dark:text-main-foreground">
        Lỗi không xác định xảy ra!
      </h2>
      <div className="flex items-center gap-4">
        <Button
          variant={"outline"}
          size={"sm"}
          className="bg-main dark:bg-main-component hover:bg-main/70 dark:hover:bg-main/70 transition duration-200 rounded-lg text-white dark:text-main-foreground shadow-[0px_2px_0px_0px_#FFFFFF40_inset]"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Tải lại trang
        </Button>
        <Button
          size={"sm"}
          onClick={() => router.push("/")}
          className="bg-main dark:bg-main-component hover:bg-main/70 dark:hover:bg-main/70 transition duration-200 rounded-lg text-white dark:text-main-foreground shadow-[0px_2px_0px_0px_#FFFFFF40_inset]"
        >
          Về trang chủ
        </Button>
      </div>
    </div>
  );
}
