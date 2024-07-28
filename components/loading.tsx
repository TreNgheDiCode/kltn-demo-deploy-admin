"use client";

import { Vortex } from "./ui/vortex";

export default function Loading() {
  return (
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md  h-screen overflow-hidden">
      <Vortex
        backgroundColor="transparent"
        rangeY={800}
        particleCount={500}
        baseHue={120}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        <h2 className="text-main dark:text-main-foreground text-2xl md:text-6xl font-bold text-center">
          Đang tải thông tin!
        </h2>
        <p className="text-main dark:text-main-foreground text-sm md:text-2xl max-w-xl mt-6 text-center">
          Nếu trên 10 giây không tải được, vui lòng kiểm tra kết nối mạng của
          bạn hoặc tải lại trang.
        </p>

        <button className="px-4 py-2 bg-main dark:bg-main-component hover:bg-main/70 dark:hover:bg-main/70 transition duration-200 rounded-lg text-white dark:text-main-foreground shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
          Tải lại trang
        </button>
      </Vortex>
    </div>
  );
}
