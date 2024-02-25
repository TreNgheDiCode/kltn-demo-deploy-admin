"use client";

import { SchoolExtend } from "@/types/type";
import {
  Avatar,
  Chip,
  Divider,
  Listbox,
  ListboxItem,
  ScrollShadow,
} from "@nextui-org/react";
import Image from "next/image";
import { HeadingTitle } from "./heading-title";

interface SchoolProfileProps {
  school: SchoolExtend;
}

export const SchoolProfile = ({ school }: SchoolProfileProps) => {
  return (
    <div className="space-y-3">
      <div
        className={`relative flex flex-col items-center justify-center w-full h-[35vh] border-5 border-primary gap-2`}
      >
        <Avatar src={school.logoUrl} className="z-10" size="lg" />
        <h1 className="font-bold text-white dark:text-primary text-4xl z-10 text-center">
          {school.name}
        </h1>
        <Image
          alt="school cover"
          src={school.backgroundUrl}
          fill
          className="absolute object-cover blur-sm"
          quality={100}
          priority
        />
      </div>
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
                    {school.isPublished ? "Kích hoạt" : "Đang ẩn"}
                  </Chip>
                }
                className="hover:cursor-default"
              >
                Trạng thái
              </ListboxItem>
              <ListboxItem
                key="name"
                variant="faded"
                color="primary"
                className="hover:cursor-default"
                endContent={
                  <span className="font-semibold">{school.name}</span>
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
            <HeadingTitle text={`Học sinh (${school.users.length})`} />
            <ScrollShadow hideScrollBar className="max-h-[300px]">
              <Listbox
                variant="faded"
                color="primary"
                emptyContent="Không có học sinh."
                aria-label="School's Students"
              >
                {school.users.map((user) => (
                  <ListboxItem key={user.name} className="hover:cursor-default">
                    {user.name}
                  </ListboxItem>
                ))}
              </Listbox>
            </ScrollShadow>
          </div>
        </div>
      </div>
      <HeadingTitle text="Giới thiệu" />
      <HeadingTitle text="Lịch sử hình thành" />
    </div>
  );
};
