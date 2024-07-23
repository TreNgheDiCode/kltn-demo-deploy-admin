"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useScrollAnchor } from "@/hooks/use-scroll-anchor";
import { IconArrowDown } from "@tabler/icons-react";

export function ButtonScrollToBottom() {
  const { isAtBottom, scrollToBottom } = useScrollAnchor();
  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "absolute top-28 right-20 z-50 text-white dark:text-main-background bg-main-background dark:bg-main-foreground transition-opacity duration-300 hover:bg-main-background/80 opacity-35 hover:opacity-70 hover:text-white"
      )}
      onClick={() => scrollToBottom()}
    >
      <IconArrowDown />
      <span className="sr-only">Xuống dưới cùng</span>
    </Button>
  );
}
