"use client";

import { TypewriterEffectSmooth } from "./ui/typewriter-effect";

export default function Loading() {
  const words = [
    {
      text: "Đang",
    },
    {
      text: "Tải",
    },
    {
      text: "Dữ",
    },
    {
      text: "Liệu",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center size-full">
      <div className="relative size-10"></div>
      <TypewriterEffectSmooth words={words}></TypewriterEffectSmooth>
    </div>
  );
}
