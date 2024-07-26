"use client";

import { usePathname, useRouter } from "next/navigation";
import { Heading } from "./heading";
import { ThemeToggle } from "./theme-toggle";
import { UserMenuDropdown } from "./user-menu-dropdown";
import { Button } from "./ui/button";

type Props = {
  title?: string;
  description?: string;
};

export const Navbar = ({ title, description }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  // Kiểm tra pathname có chứa 2 dấu gạch chéo hay không
  const isRoot = pathname.split("/").length === 2;

  return (
    <div className="z-50 rounded-md fixed px-8 flex h-16 items-center max-w-[calc(100vw-144px)] border-b-2 shadow-md w-full dark:bg-main-component bg-main-foreground">
      <Heading title={title} description={description} />
      <div className="flex items-center gap-4 ml-auto">
        {!isRoot && (
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => {
              router.push("/" + pathname.split("/")[1]);
            }}
          >
            Quay về trang chính
          </Button>
        )}
        <ThemeToggle />
        <UserMenuDropdown />
      </div>
    </div>
  );
};
