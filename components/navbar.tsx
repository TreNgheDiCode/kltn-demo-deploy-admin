"use client";

import { Heading } from "./heading";
import { ThemeToggle } from "./theme-toggle";
import { UserMenuDropdown } from "./user-menu-dropdown";

type Props = {
  title?: string;
  description?: string;
};

export const Navbar = ({ title, description }: Props) => {
  return (
    <div className="z-50 rounded-md fixed px-8 flex h-16 items-center max-w-[calc(100vw-144px)] border-b-2 shadow-md w-full dark:bg-main-component bg-main-foreground">
      <Heading title={title} description={description} />
      <div className="flex items-center gap-4 ml-auto">
        <ThemeToggle />
        <UserMenuDropdown />
      </div>
    </div>
  );
};
