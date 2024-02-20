"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import { ChevronsUpDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { ButtonsAll } from "./buttons-all";
import { CompanyLogo } from "./company-logo";
import { NavigationList } from "./navigation-list";
import { UserMenu } from "./user-menu";
import { ButtonsTool } from "./buttons-tool";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed w-72 p-3 flex h-full flex-col bg-gray-100 gap-3 rounded-r-3xl dark:bg-[#2a2d30] shadow-2xl">
      <CompanyLogo />
      {/* @ts-ignore */}
      <Accordion
        isCompact
        className="p-0 flex flex-col gap-3"
        defaultExpandedKeys={["all"]}
      >
        <AccordionItem
          key={"all"}
          aria-label="all"
          indicator={<ChevronsUpDown />}
          title="TỔNG QUAN"
          classNames={{
            title: "text-primary font-semibold text-sm uppercase",
            trigger: "p-0",
            heading: "p-0",
          }}
        >
          <ButtonsAll />
        </AccordionItem>
        {pathname === "/statistics" && (
          <AccordionItem
            key={"statistics"}
            aria-label="statistics"
            indicator={<ChevronsUpDown />}
            title="QUẢN LÝ"
            classNames={{
              title: "text-primary font-semibold text-sm uppercase",
              trigger: "p-0",
              heading: "p-0",
            }}
          >
            <NavigationList />
          </AccordionItem>
        )}
        <AccordionItem
          key={"tools"}
          aria-label="tools"
          indicator={<ChevronsUpDown />}
          title="CÔNG CỤ"
          classNames={{
            title: "text-primary font-semibold text-sm uppercase",
            trigger: "p-0",
            heading: "p-0",
          }}
        >
          <ButtonsTool />
        </AccordionItem>
      </Accordion>
      <div className="mt-auto">
        <UserMenu />
      </div>
    </div>
  );
};
