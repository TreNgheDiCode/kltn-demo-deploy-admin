"use client";

import { UserMenu } from "./user-menu";

export const Sidebar = () => {
  return (
    <div className="w-72 p-3 h-full flex flex-col ">
      <div>Main component</div>
      <div className="mt-auto">
        <UserMenu />
      </div>
    </div>
  );
};
