"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { IconTransferOut } from "@tabler/icons-react";

export const UserMenuDropdown = () => {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.imageUrl ?? "/logo.jpg"}
              alt={user?.fullName ?? ""}
            />
            <AvatarFallback>{user?.firstName?.[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.fullName ?? "Trang quản trị"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.emailAddresses[0].emailAddress ?? "services@mecltd.edu.vn"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOutButton>
            <div className="flex items-center w-full font-normal hover:font-semibold transition">
              Đăng xuất
              <IconTransferOut className="ml-auto" />
            </div>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
