"use client";
import {
  ChatBotPlus,
  Sidebar,
  SidebarBody,
  SidebarItem,
  SidebarLink,
} from "@/components/ui/sidebar";
import { navItems } from "@/data/nav-items";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function ChatBotSidebar() {
  const [open, setOpen] = useState(false);
  const items = navItems;

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1">
          {open ? <Logo /> : <LogoIcon />}
          <ChatBotPlus />
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex items-center text-sm dark:text-white py-3 relative z-20 shadow-md border-main bg-white dark:bg-main-component rounded-lg px-2 mb-4 text-main"
    >
      <Image
        src="/logo_icon_light.png"
        className="bg-transparent mr-2 dark:mr-0 dark:hidden"
        alt="logo"
        width={43}
        height={43}
      />
      <Image
        src="/logo_icon_dark.png"
        className="hidden dark:mr-2 mr-0 bg-transparent dark:block"
        alt="logo"
        width={43}
        height={43}
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-semibold whitespace-pre"
      >
        Canada Medical and Education
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="font-normal flex items-center text-sm text-black py-1 relative z-20"
    >
      <Image
        src="/logo_icon_light.png"
        className="bg-transparent dark:hidden"
        alt="logo"
        width={50}
        height={50}
      />
      <Image
        src="/logo_icon_dark.png"
        className="hidden bg-transparent dark:block"
        alt="logo"
        width={50}
        height={50}
      />
    </Link>
  );
};
