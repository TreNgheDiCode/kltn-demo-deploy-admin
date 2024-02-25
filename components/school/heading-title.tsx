"use client";

import { Divider } from "@nextui-org/react";

interface HeadingTitleProps {
  text: string;
}

export const HeadingTitle = ({ text }: HeadingTitleProps) => {
  return (
    <div>
      <h1 className="text-primary font-bold text-2xl">{text}</h1>
      <Divider className="h-1 bg-black dark:bg-white" />
    </div>
  );
};
