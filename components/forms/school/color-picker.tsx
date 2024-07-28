"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

type Props = {
  disabled?: boolean;
  onSelect?: (value: string) => void;
  defaultValue?: string;
};
export const SchoolColorPicker = ({
  defaultValue,
  onSelect,
  disabled,
}: Props) => {
  const [background, setBackground] = useState(defaultValue);

  useEffect(() => {
    setBackground(defaultValue);
  }, [defaultValue]);

  return (
    <div
      className="w-full h-full preview flex justify-center p-10 items-center rounded !bg-cover !bg-center transition-all border border-dashed border-main-background dark:border-main-foreground"
      style={{ background }}
    >
      <Input
        disabled={disabled}
        placeholder="#00000"
        value={background}
        className="col-span-2 h-8"
        onChange={(e) => {
          setBackground(e.currentTarget.value);
          onSelect?.(e.currentTarget.value);
        }}
      />
    </div>
  );
};
