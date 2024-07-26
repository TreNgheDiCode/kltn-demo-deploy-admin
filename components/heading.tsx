"use client";

import { navItems } from "@/data/nav-items";
import { usePathname } from "next/navigation";

type Props = {
  description?: string;
  title?: string;
};

export const Heading = ({ title, description }: Props) => {
  const pathname = usePathname();
  const item = navItems;

  const currentItem = item.find((item) => item.root === pathname);

  console.log(pathname);

  return (
    <div className="w-full space-y-1">
      <h1 className="text-xl font-bold text-main dark:text-white">
        {title ?? currentItem?.label}
      </h1>
      <p className="text-sm text-muted-foreground dark:text-neutral-300 italic">
        {description}
      </p>
    </div>
  );
};
