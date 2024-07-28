"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { CreateSchoolFormValues } from "@/data/form-schema";
import Image from "next/image";
import { PreviewInformation } from "./preview-information";

type Props = {
  school: CreateSchoolFormValues;
};
export const PreviewSchoolInformation = ({ school }: Props) => {
  const schoolWordsName = school.name.split(" ");
  const words = schoolWordsName.map((word) => {
    return {
      text: word,
    };
  });

  return (
    <>
      <div className="absolute inset-0 size-full blur-md">
        <Image
          src={school.background}
          alt={school.name}
          quality={100}
          width={793 * 2}
          height={417 * 2}
          className="object-cover"
        />
      </div>
      <div className="size-full flex items-center justify-center gap-4 flex-col z-50">
        <Avatar className="w-24 h-24 border-main dark:border-main-foreground shadow-2xl transition hover:scale-110">
          <AvatarImage src={school.logo} alt={school.name} className="p-4" />
          <AvatarFallback>
            <Image src="/logo_icon_light.png" alt="logo" fill />
          </AvatarFallback>
        </Avatar>
        <Separator className="z-50 h-1.5 max-w-4xl bg-main dark:bg-main-foreground" />
        <div className="z-50">
          <TypewriterEffectSmooth words={words} className="my-0" />
        </div>
        <h1 className="text-lg text-main dark:text-main-foreground z-50">
          {school.country}
        </h1>
        <PreviewInformation school={school} />
      </div>
    </>
  );
};
