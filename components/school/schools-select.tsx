"use client";

import { cn } from "@/lib/utils";
import { SchoolLib } from "@/types/type";
import {
  Button,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { Check } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { CreateTrigger } from "./create-trigger";

interface SchoolSelectProps {
  schools: SchoolLib[];
}

export const SchoolsSelect = ({ schools }: SchoolSelectProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const schoolId = searchParams.get("id") as string;

  const currentSchool = schools.find((school) => school.id === schoolId);

  const onSelect = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("id", id);

    router.push(pathname + "?" + params.toString());
  };

  const { isOpen, onOpen: onTrigger, onClose } = useDisclosure();

  return (
    <Popover isOpen={isOpen} onOpenChange={onClose}>
      <PopoverTrigger>
        <Button
          onClick={onTrigger}
          aria-label="Chọn một trường học"
          aria-expanded={true}
          role="combobox"
          variant="shadow"
          color="primary"
          className="flex items-center gap-2"
        >
          {currentSchool ? (
            <>
              <Image
                alt="school logo"
                src={currentSchool?.logo}
                className="size-6 flex-1"
              />
              <span className="truncate">{currentSchool?.name}</span>
            </>
          ) : (
            "Vui lòng chọn trường học"
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="">
        <Command>
          <CommandInput placeholder="Tìm kiếm trường học..." />
          <CommandEmpty>Không tìm thấy trường học</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {schools.map((school) => (
                <CommandItem
                  value={school.id}
                  onSelect={() => {
                    onSelect(school.id);
                    onClose();
                  }}
                  key={school.id}
                  className="flex items-center justify-between gap-2 text-primary"
                >
                  <Image
                    alt="school logo"
                    src={school?.logo}
                    className="size-6 flex-1"
                  />
                  <span className="line-clamp-1">{school.name}</span>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentSchool?.name === school.name
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
          <CreateTrigger />
        </Command>
      </PopoverContent>
    </Popover>
  );
};
