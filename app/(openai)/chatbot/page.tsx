import ChatWrapper from "@/components/chatbot/chat-wrapper";
import Loading from "@/components/loading";
import { auth } from "@clerk/nextjs/server";

const ChatBotPage = async () => {
  const session = await auth();

  if (!session.userId) {
    return <Loading />;
  }

  return <ChatWrapper />;
};

export default ChatBotPage;
