"use client";

import { AI } from "@/action/chatbot";
import { generateId } from "ai";
import { useActions, useUIState } from "ai/rsc";
import { UserMessage } from "./messages";

const cardMessages = [
  {
    heading: "Có tất cả",
    subheading: "mấy quốc gia tôi có thể lựa chọn?",
    message: `Những Quốc gia nào Công ty TNHH Tư vấn giáo dục và y tế Canada (CEMC Co,. Ltd) hỗ trợ tư vấn du học và đăng ký hồ sơ?`,
  },
  {
    heading: "Liệt kê",
    subheading: "một số trường học trong hệ thống tư vấn.",
    message:
      "Những trường học nào hiện tại được hỗ trợ đăng ký tư vấn và nộp hồ sơ du học trong hệ thống của CEMC Co,. Ltd?",
  },
  {
    heading: "Tôi muốn được",
    subheading: "đăng ký du học tại Canada.",
    message: `Làm thế nào để tôi có thể đăng ký tư vấn du học và nộp hồ sơ tại Canada thông qua CEMC Co,. Ltd?`,
  },
  {
    heading: "Những sự kiện",
    subheading: `nổi bật nào được tổ chức ở các trường học?`,
    message: `Liệt kê 1 số sự kiện nổi bật mà các trường học trong hệ thống CEMC Co,. Ltd đồng hợp tác thường tổ chức?`,
  },
];

export const EmptyScreen = () => {
  const [conversation, setConversation] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions();

  return (
    <div className="relative flex-1 h-full">
      <div className="w-full h-full overflow-auto bg-transparent dark:bg-grid-white/[0.05] bg-grid-black/[0.05] relative flex items-center justify-center flex-col">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white dark:bg-black opacity-15 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <p className="text-4xl sm:text-7xl font-bold relative z-20 -translate-y-16 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 text-center">
          Xin chào, <br /> chúng tôi giúp được gì cho bạn?
        </p>
        <div className="grid grid-cols-2 gap-2 px-4 sm:px-0">
          {cardMessages.map((card, index) => (
            <div
              key={card.heading}
              className={`cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                index > 1 && "hidden md:block"
              }`}
              onClick={async () => {
                setConversation((currentMessages) => [
                  ...currentMessages,
                  {
                    id: generateId(),
                    display: <UserMessage>{card.message}</UserMessage>,
                    role: "user",
                  },
                ]);

                const responseMessage = await submitUserMessage(card.message);

                setConversation((currentMessages) => [
                  ...currentMessages,
                  responseMessage,
                ]);
              }}
            >
              <div className="text-sm font-semibold">{card.heading}</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                {card.subheading}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
