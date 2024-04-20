"use client";

import { SchoolExtend } from "@/types/type";
import {
  Avatar,
  Button,
  Chip,
  Listbox,
  ListboxItem,
  ScrollShadow,
} from "@nextui-org/react";
import Image from "next/image";
import { HeadingTitle } from "./heading-title";
import { Pencil } from "lucide-react";
import { useUpdateSchoolProfile } from "@/hooks/use-update-school-profile";
import { useMemo } from "react";
import dynamic from "next/dynamic";

interface SchoolProfileProps {
  school: SchoolExtend;
}

export const SchoolProfile = ({ school }: SchoolProfileProps) => {
  const Editor = useMemo(
    () =>
      dynamic(() => import("@/components/school/description-editor"), {
        ssr: false,
      }),
    []
  );

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <HeadingTitle text="Thông tin" />
          <div className="flex items-center gap-2">
            <Listbox aria-label="School's Information">
              <ListboxItem
                key="status"
                variant="faded"
                color="primary"
                endContent={
                  <Chip
                    color={school.isPublished ? "success" : "default"}
                    variant="bordered"
                  >
                    {school.isPublished ? "Kích hoạt" : "Tạm ẩn"}
                  </Chip>
                }
                className="hover:cursor-default"
              >
                Trạng thái
              </ListboxItem>
              <ListboxItem
                key="color"
                variant="faded"
                color="primary"
                className="hover:cursor-default"
                endContent={
                  <div className="flex items-center gap-2 truncate font-semibold max-w-[300px]">
                    <span className="truncate">{school.color}</span>
                    <div
                      className="border p-4 rounded-full"
                      style={{
                        background: school.color,
                        backgroundImage: school.color,
                      }}
                    />
                  </div>
                }
              >
                Mã màu
              </ListboxItem>
              <ListboxItem
                key="name"
                variant="faded"
                color="primary"
                className="hover:cursor-default"
                endContent={
                  <span className="truncate font-semibold max-w-[300px]">
                    {school.name}
                  </span>
                }
              >
                Tên
              </ListboxItem>
              <ListboxItem
                key="location"
                variant="faded"
                color="primary"
                className="hover:cursor-default"
                endContent={
                  <span className="font-semibold">
                    {school.locations.length > 0
                      ? school.locations[0].name
                      : "[Không có thông tin]"}
                  </span>
                }
              >
                Cơ sở chính:
              </ListboxItem>
              <ListboxItem
                key="short"
                variant="faded"
                color="primary"
                className="hover:cursor-default flex-col items-start"
                endContent={
                  <span className="font-semibold">
                    {school.short ? school.short : "[Không có thông tin]"}
                  </span>
                }
              >
                Giới thiệu ngắn:
              </ListboxItem>
            </Listbox>
          </div>
        </div>
        <div className="space-y-3">
          <div className="space-y-2">
            <HeadingTitle text={`Cơ sở (${school.locations.length})`} />
            <Listbox
              variant="faded"
              color="primary"
              emptyContent="Không có cơ sở."
              aria-label="School's Location"
            >
              {school.locations.map((location) => (
                <ListboxItem
                  key={location.name}
                  className="hover:cursor-default"
                >
                  {location.name}
                </ListboxItem>
              ))}
            </Listbox>
          </div>
          <div className="space-y-2">
            <HeadingTitle text={`Ngành đào tạo (${school.programs.length})`} />
            <Listbox
              variant="faded"
              color="primary"
              emptyContent="Không có ngành đào tạo."
              aria-label="School's Program"
            >
              {school.programs.map((program) => (
                <ListboxItem
                  key={program.name}
                  className="hover:cursor-default"
                >
                  {program.name}
                </ListboxItem>
              ))}
            </Listbox>
          </div>
          <div className="space-y-2">
            <HeadingTitle text={`Thư viện (${school.galleries.length})`} />
            <Listbox
              variant="faded"
              color="primary"
              emptyContent="Không có thư viện."
              aria-label="School's Galleries"
            >
              {school.galleries.map((gallery) => (
                <ListboxItem
                  key={gallery.name}
                  className="hover:cursor-default"
                >
                  {gallery.name}
                </ListboxItem>
              ))}
            </Listbox>
          </div>
          <div className="space-y-2">
            <HeadingTitle text={`Học sinh (${school.students.length})`} />
            <ScrollShadow hideScrollBar className="max-h-[300px]">
              <Listbox
                variant="faded"
                color="primary"
                emptyContent="Không có học sinh."
                aria-label="School's Students"
              >
                {school.students.map((student) => (
                  <ListboxItem
                    key={student.account.name}
                    className="hover:cursor-default"
                  >
                    {student.account.name}
                  </ListboxItem>
                ))}
              </Listbox>
            </ScrollShadow>
          </div>
        </div>
      </div>
      <HeadingTitle text="Giới thiệu" />
      <Editor editable={false} initialContent={school.description || ""} />
      <HeadingTitle text="Lịch sử hình thành" />
      <Editor editable={false} initialContent={school.history || ""} />
    </div>
  );
};
