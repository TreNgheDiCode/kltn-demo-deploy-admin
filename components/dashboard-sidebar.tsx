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
              if (item.label === "Bảng điều khiển" || item.label === "Hỗ trợ") {
                return (
                  <div key={idx} className="divide-x-2">
                    <SidebarLink link={item} className="hover:underline" />
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
      className="font-normal flex space-x-2 items-center text-sm dark:text-white py-3 relative z-20 shadow-md border-main bg-white rounded-lg px-2 mb-4 text-main"
    >
      <Image
        src="/logo_icon_light.png"
        className="bg-transparent dark:hidden"
        alt="logo"
        width={46}
        height={46}
      />
      <Image
        src="/logo_icon_dark.png"
        className="hidden bg-transparent dark:block"
        alt="logo"
        width={46}
        height={46}
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
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
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
