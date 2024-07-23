"use client";

import { AI } from "@/action/chatbot";
import { FooterText } from "@/app/(openai)/chatbot/footer";
import { useUIState } from "ai/rsc";
import { ReactNode, useState } from "react";
import { ChatList } from "./chat-list";
import { EmptyScreen } from "./empty-screen";
import { PromptForm } from "./prompt-form";
import { useScrollAnchor } from "@/hooks/use-scroll-anchor";
import { ButtonScrollToBottom } from "./button-scroll-to-bottom";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export interface ServerMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ClientMessage {
  id: string;
  role: "user" | "assistant";
  display: ReactNode;
}

export default function ChatWrapper() {
  const [conversation, setConversation] = useUIState<typeof AI>();

  const { scrollRef } = useScrollAnchor();

  return (
    <>
      <div className="flex-grow overflow-y-auto">
        <div className="w-full h-px" ref={scrollRef} />
        {conversation.length ? (
          <ChatList messages={conversation} isShared={false} />
        ) : (
          <EmptyScreen />
        )}
      </div>
    </>
  );
}
