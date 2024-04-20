"use client";

import { Accordion, AccordionItem, ScrollShadow } from "@nextui-org/react";
import { ChevronsLeft, ChevronsRight, ChevronsUpDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { ButtonsAll } from "./buttons-all";
import { CompanyLogo } from "./company-logo";
import { NavigationList } from "./navigation-list";
import { UserMenu } from "./user-menu";
import { ButtonsTool } from "./buttons-tool";
import { ElementRef, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const pathname = usePathname();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarRef = useRef<ElementRef<"aside">>(null);

  const collapse = () => {
    if (sidebarRef.current) {
      setIsCollapsed(true);

      sidebarRef.current.style.width = "102px";
    }
  };

  const resetWidth = () => {
    if (sidebarRef.current) {
      setIsCollapsed(false);

      sidebarRef.current.style.width = "288px";
    }
  };

  const handleCollapse = () => {
    if (isCollapsed) {
      resetWidth();
    } else {
      collapse();
    }
  };

  return (
    <aside
      ref={sidebarRef}
      className="group/sidebar h-screen fixed w-72 p-3 flex flex-col bg-gray-100 gap-3 rounded-r-3xl dark:bg-[#2a2d30] shadow-2xl scrollbar-hide"
    >
      <div
        role="button"
        onClick={handleCollapse}
        className="absolute z-50 -right-3 top-1/2 size-6 text-muted-foreground transition hover:bg-neutral-300 opacity-0 group-hover/sidebar:opacity-100 dark:hover:bg-neutral-600 rounded-full bg-gray-100 dark:bg-[#2a2d30]"
      >
        {!isCollapsed ? (
          <ChevronsLeft className="size-6" />
        ) : (
          <ChevronsRight className="size-6" />
        )}
      </div>
      <CompanyLogo isCollapsed={isCollapsed} />
      {/* @ts-ignore */}
      <Accordion
        isCompact
        className="p-0 flex flex-col gap-3"
        defaultExpandedKeys={
          pathname.startsWith("/manangements") ? ["manangements"] : ["all"]
        }
      >
        <AccordionItem
          key={"all"}
          aria-label="all"
          indicator={<ChevronsUpDown />}
          title={!isCollapsed && "TỔNG QUAN"}
          classNames={{
            title: "text-primary font-semibold text-sm uppercase",
            trigger: cn("p-0", isCollapsed && "justify-center"),
            heading: "p-0",
            titleWrapper: isCollapsed && "hidden",
          }}
        >
          <ButtonsAll isCollapsed={isCollapsed} />
        </AccordionItem>
        {pathname.startsWith("/manangements") && (
          <AccordionItem
            key={"manangements"}
            aria-label="manangements"
            indicator={<ChevronsUpDown />}
            title={!isCollapsed && "QUẢN LÝ"}
            classNames={{
              title: "text-primary font-semibold text-sm uppercase",
              trigger: cn("p-0", isCollapsed && "justify-center"),
              heading: "p-0",
              titleWrapper: isCollapsed && "hidden",
            }}
          >
            <NavigationList isCollapsed={isCollapsed} />
          </AccordionItem>
        )}
        <AccordionItem
          key={"tools"}
          aria-label="tools"
          indicator={<ChevronsUpDown />}
          title="CÔNG CỤ"
          classNames={{
            title: "text-primary font-semibold text-sm uppercase",
            trigger: cn("p-0", isCollapsed && "justify-center"),
            heading: "p-0",
            titleWrapper: isCollapsed && "hidden",
          }}
        >
          <ButtonsTool isCollapsed={isCollapsed} />
        </AccordionItem>
      </Accordion>
      <div className="mt-auto">
        <UserMenu isCollapsed={isCollapsed} />
      </div>
    </aside>
  );
};
