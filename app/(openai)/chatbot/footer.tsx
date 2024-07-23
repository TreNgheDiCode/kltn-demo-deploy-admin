import React from "react";

import { cn } from "@/lib/utils";

export function FooterText({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "px-2 text-center text-xs leading-normal text-muted-foreground",
        className
      )}
      {...props}
    >
      Chat Bot có thể cung cấp thông tin sai lệch, bao gồm thông tin về trường
      học, con người và vấn đề liên quan, kiểm tra cẩn thận thận trước những câu
      trả lời.
    </p>
  );
}
