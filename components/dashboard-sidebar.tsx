"use client";
import {
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

export function DashboardSidebar() {
  const [open, setOpen] = useState(false);
  const items = navItems;

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1">
          {open ? <Logo /> : <LogoIcon />}
          <Accordion type="single" collapsible className="w-full font-medium">
            {items.map((item, idx) => {
              if (
                item.label === "Bảng điều khiển" ||
                item.label === "Hỗ trợ" ||
                item.label === "Trợ lý ảo"
              ) {
                return (
                  <div key={idx}>
                    <SidebarLink link={item} className="hover:underline py-4" />
                  </div>
                );
              }
              return (
                <AccordionItem
                  key={idx}
                  value={item.label}
                  className="border-none"
                >
                  <AccordionTrigger>
                    <SidebarItem link={item} />
                  </AccordionTrigger>
                  <AccordionContent>
                    {item.children?.map((child, idx) => (
                      <SidebarLink
                        key={idx}
                        link={child}
                        className="hover:underline"
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
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
        className="hidden bg-transparent mr-0 dark:mr-2 dark:block"
        alt="logo"
        width={43}
        height={43}
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-semibold whitespace-pre dark:text-main-foreground"
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
        className="bg-transparent mr-2 dark:mr-0 dark:hidden"
        alt="logo"
        width={50}
        height={50}
      />
      <Image
        src="/logo_icon_dark.png"
        className="hidden bg-transparent mr-0 dark:mr-2 dark:block"
        alt="logo"
        width={50}
        height={50}
      />
    </Link>
  );
};
