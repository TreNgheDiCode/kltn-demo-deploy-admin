import { ChatBotSidebar } from "@/components/chatbot-sidebar";
import { PromptForm } from "@/components/chatbot/prompt-form";
import { ThemeToggle } from "@/components/theme-toggle";
import { FlipWords } from "@/components/ui/flip-words";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { UserMenuDropdown } from "@/components/user-menu-dropdown";
import { cn } from "@/lib/utils";
import { FooterText } from "./chatbot/footer";
import { AI } from "@/action/chatbot";
import { ButtonScrollToBottom } from "@/components/chatbot/button-scroll-to-bottom";

type Props = {
  children: React.ReactNode;
};

export const metadata = {
  title: "Chat Bot | CANADA MEDICAL AND EDUCATION",
};

const ChatBotLayout = ({ children }: Props) => {
  const words = [
    {
      text: "Chào",
    },
    {
      text: "bạn,",
    },
    {
      text: "hãy",
    },
    {
      text: "đặt",
    },
    {
      text: "câu",
    },
    {
      text: "hỏi",
    },
    {
      text: "cho",
    },
    {
      text: "CEMC.",
      className: "text-main",
    },
  ];

  const flips = [
    "Thông minh",
    "Mạnh mẽ",
    "Chính xác",
    "Tiềm năng",
    "Nhanh chóng",
  ];

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-main-foreground relative dark:bg-main-background w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden max-h-screen"
      )}
    >
      <div className="flex flex-1 overflow-hidden">
        <ChatBotSidebar />
        <div className="relative p-2 md:px-10 pt-10 pb-4 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-background flex flex-col gap-2 flex-1 w-full h-full overflow-hidden">
          <div className="z-50 rounded-md px-8 flex h-16 items-center max-w-[calc(100vw-144px)] w-full bg-transparent">
            <div className="w-full flex items-center justify-center">
              <TypewriterEffectSmooth words={words} />
              <FlipWords words={flips} />
              <div className="flex items-center gap-4 ml-auto">
                <ThemeToggle />
                <UserMenuDropdown />
              </div>
            </div>
          </div>
          <AI>
            <div className="flex flex-col flex-1 overflow-y-auto">
              {children}
            </div>
            <div className="mt-auto space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
              <PromptForm />
              <FooterText className="hidden sm:block mt-auto" />
            </div>
          </AI>
        </div>
      </div>
    </div>
  );
};

export default ChatBotLayout;
