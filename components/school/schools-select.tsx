"use client";

import { SchoolLib } from "@/types/type";
import { Image, Select, SelectItem } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SchoolSelectProps {
  schools: SchoolLib[];
}

export const SchoolsSelect = ({ schools }: SchoolSelectProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const schoolId = searchParams.get("id") as string;

  const onSelect = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("id", id);

    router.push(pathname + "?" + params.toString());
  };
  return (
    <Select
      disallowEmptySelection
      defaultSelectedKeys={schoolId ? [schoolId] : undefined}
      className="max-w-[250px] lg:max-w-[400px]"
      onChange={(e) => {
        onSelect(e.target.value);
      }}
      items={schools}
      size="sm"
      aria-label="Vui lòng chọn trường học"
      placeholder="Vui lòng chọn trường học"
      variant="bordered"
      renderValue={(items) => {
        return items.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            <Image
              alt="school logo"
              src={item.data?.logoUrl}
              className="size-6 flex-1"
            />
            <span className="truncate">{item.data?.name}</span>
          </div>
        ));
      }}
    >
      {(school) => (
        <SelectItem
          startContent={
            <Image alt="school logo" src={school.logoUrl} className="size-6" />
          }
          key={school.id}
        >
          {school.name}
        </SelectItem>
      )}
    </Select>
  );
};
