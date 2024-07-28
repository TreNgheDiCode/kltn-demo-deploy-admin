"use client";

import { useRouter } from "next/navigation";
import { Heading } from "../heading";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
import { UserMenuDropdown } from "../user-menu-dropdown";

type Props = {
  title?: string;
  description?: string;
};

export const SchoolNavbar = ({ title, description }: Props) => {
  const router = useRouter();

  return (
    <div className="z-50 rounded-md fixed px-8 flex h-16 items-center max-w-[calc(100vw-144px)] border-b-2 shadow-md w-full dark:bg-main-component bg-main-foreground">
      <Heading title={title} description={description} />
      <div className="flex items-center gap-4 ml-auto">
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => {
            router.push("/schools/create");
          }}
        >
          Thêm trường học
        </Button>
        <ThemeToggle />
        <UserMenuDropdown />
      </div>
    </div>
  );
};
