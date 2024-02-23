"use client";

import { cn } from "@/lib/utils";
import { Button, Link, Switch } from "@nextui-org/react";
import { MoonIcon, Palette, Settings, Sheet, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

interface ButtonsToolProps {
  isCollapsed: boolean;
}

export const ButtonsTool = ({ isCollapsed }: ButtonsToolProps) => {
  const { theme, setTheme } = useTheme();

  const onChange = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className={cn("flex flex-col gap-3", isCollapsed && "items-center")}>
      <Button
        startContent={<Sheet className="w-4 h-4" />}
        as={Link}
        variant="light"
        className={cn(
          "items-center flex-row justify-start py-0 text-sm",
          isCollapsed && "w-fit min-w-0"
        )}
        size="sm"
      >
        {!isCollapsed && "Lập báo cáo"}
      </Button>
      <Button
        startContent={<Settings className="w-4 h-4" />}
        as={Link}
        variant="light"
        className={cn(
          "items-center flex-row justify-start py-0 text-sm",
          isCollapsed && "w-fit min-w-0"
        )}
        size="sm"
      >
        {!isCollapsed && "Cài đặt"}
      </Button>
      <Button
        onClick={onChange}
        startContent={!isCollapsed && <Palette className="w-4 h-4" />}
        as={Link}
        variant="light"
        className={cn(
          "items-center flex-row justify-start py-0 text-sm",
          isCollapsed && "w-fit min-w-0"
        )}
        size="sm"
      >
        {!isCollapsed && "Giao diện"}
        <Switch
          className="ml-auto"
          classNames={{
            wrapper: "mr-0",
          }}
          isSelected={theme === "light" ? true : false}
          thumbIcon={({ isSelected, className }) =>
            isSelected ? (
              <SunIcon className={className} />
            ) : (
              <MoonIcon className={className} />
            )
          }
          onValueChange={onChange}
        />
      </Button>
    </div>
  );
};
