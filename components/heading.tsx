"use client";

import { navItems } from "@/data/nav-items";
import { usePathname } from "next/navigation";

type Props = {
  description?: string;
};

export const Heading = ({ description }: Props) => {
  const pathname = usePathname();
  const item = navItems;

  // Find the current item that match the pathname
  const currentItem = item.find((item) => item.href === pathname);

  // Return heading display title and description related to the current item, in Vietnamese
  return (
    <div className="w-full space-y-1">
      <h1 className="text-xl font-bold text-main dark:text-white">
        {currentItem?.label}
      </h1>
      <p className="text-sm text-muted-foreground dark:text-neutral-300 italic">
        {description}
      </p>
    </div>
  );
};
