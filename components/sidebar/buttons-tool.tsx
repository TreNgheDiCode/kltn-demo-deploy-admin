"use client";

import { Button, Link, Switch } from "@nextui-org/react";
import { MoonIcon, Palette, Settings, Sheet, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export const ButtonsTool = () => {
  const { theme, setTheme } = useTheme();

  const onChange = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Button
        startContent={<Sheet className="w-4 h-4" />}
        as={Link}
        variant="light"
        className="items-center flex-row justify-start text-sm"
        size="sm"
      >
        Lập báo cáo
      </Button>
      <Button
        startContent={<Settings className="w-4 h-4" />}
        as={Link}
        variant="light"
        className="items-center flex-row justify-start py-0 text-sm"
        size="sm"
      >
        Cài đặt
      </Button>
      <Button
        onClick={onChange}
        startContent={<Palette className="w-4 h-4" />}
        as={Link}
        variant="light"
        className="items-center flex-row justify-start py-0 text-sm pr-0"
        size="sm"
      >
        Giao diện
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
