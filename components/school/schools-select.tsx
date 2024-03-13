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
import { Check, PlusCircle } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { useCreateSchool } from "@/hooks/use-create-school";

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

  const { onOpen } = useCreateSchool();

  return (
    <Popover isOpen={isOpen}>
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
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Tìm kiếm trường học..." />
          <CommandList>
            <CommandEmpty>Không tìm thấy trường học</CommandEmpty>
            <CommandGroup heading="Trường học">
              {schools.map((school) => (
                <CommandItem
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
                  {school.name}
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
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  onOpen();
                  onClose();
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Thêm trường học mới
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
