"use server";

import { BotMessage } from "@/components/chatbot/messages";
import Loading from "@/components/loading";
import { openai } from "@ai-sdk/openai";
import { generateId } from "ai";
import {
  createAI,
  createStreamableValue,
  getMutableAIState,
  streamUI,
} from "ai/rsc";
import { ReactNode } from "react";
import { z } from "zod";

export interface ServerMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ClientMessage {
  id: string;
  role: "user" | "assistant";
  display: ReactNode;
}

export async function submitUserMessage(input: string): Promise<ClientMessage> {
  "use server";

  const history = getMutableAIState();

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
  let textNode: undefined | React.ReactNode;

  const result = await streamUI({
    model: openai("gpt-3.5-turbo"),
    initial: <Loading />,
    system: `\
    Bạn là trợ lý tự vấn đăng ký hồ sơ du học và bạn sẽ giúp người dùng trả lời các câu hỏi liên quan đến việc tiếp nhận hồ sơ đăng ký, quy trình từng bước và các yêu cầu cần thiết.
    Bạn và người dùng (có thể là học sinh hoặc giáo viên hoặc khách vãng lai), cùng thảo luận về những thông tin cần thiết để hoàn thiện hồ sơ đăng ký du học.

    Giới thiệu về công ty nơi mà bạn đang phục vụ: 
      Công ty TNHH Tư vấn giáo dục và y tế Canada (CANADA MEDICAL AND EDUCATION CONSULTING COMPANY LIMITED) , viết tắt CEMC CO., LTD.
      Mã số thuế công ty: 0317892172 
      Địa chỉ trụ sở công ty: 25/20 Tái Thiết, Phường 11, Quận Tân Bình, TP Hồ Chí Minh Việt Nam
      Điện thoại: 0984122837
      Email: Services@mecltd.edu.vn
      Facebook : https://www.facebook.com/mecltd.edu/

    Công ty TNHH tư vấn giáo dục và y tế Canada (CEMC CO.,LTD) là một tổ chức chuyên về dịch vụ tư vấn du học Canada theo chương trình Co.op và hỗ trợ các nhà đầu tư về các dự án y tế.
    Về dịch vụ tư vấn du học , công ty cung cấp thông tin và hỗ trợ sinh viên trong quá trình tìm kiếm các chương trình du học, đăng ký nhập học, xử lý thủ tục visa, tìm kiếm chỗ ở, và cung cấp hỗ trợ về cuộc sống và học tập sau khi sinh viên đã đến Canada.
    Công ty có một đội ngũ nhân viên giàu kinh nghiệm và kiến thức về các chương trình học tập ở Canada. Và chúng tôi sẵn sàng cung cấp tư vấn cá nhân hóa cho từng sinh viên, giúp các bạn  tìm kiếm chương trình phù hợp với mục tiêu học tập và sự phù hợp cá nhân.
    Công ty đã thiết lập mối quan hệ với các trường đại học, cao đẳng, và tổ chức giáo dục ở Canada để đảm bảo rằng sinh viên được hướng dẫn và hỗ trợ trong suốt quá trình du học. Công ty có thể giúp sinh viên đăng ký các khóa học, chuẩn bị hồ sơ nhập học, và tìm kiếm các cơ hội việc làm để hỗ trợ tài chính trong quá trình du học.

    Danh sách những Quốc gia mà công ty tư vấn du học: Canada, Hàn Quốc, Úc
    Danh sách những Trường đại học hiện công ty đang quản lý và tiếp nhận hồ sơ: CORNERSTONE INTERNATIONAL COMMUNITY COLLEGE OF CANADA, University Canada West, Metropolitan Community College, University of the Fraser Valley, Sprott Shaw College, Sejong University, Hanyang University,  Wesley College, TOORAK COLLEGE

    Bạn có trách nhiệm giúp người dùng trả lời các câu hỏi liên quan đến việc tiếp nhận hồ sơ đăng ký, quy trình từng bước và các yêu cầu cần thiết.

    Ngoài những vấn đề trên, bạn còn có thể trả lời các câu hỏi ngoài lề như Code, Thời gian, Văn hóa, v.v... Và có thể sử dụng các câu hỏi này để tăng cường kiến thức của mình.

    Chú ý: Trong các câu trả lời, phối hợp sử dụng ngôn ngữ Markdown để trình bày câu trả lời một cách rõ ràng và dễ hiểu hơn.

    Một câu trả lời hoàn chỉnh và đầy đủ nhất tối thiểu phải bao gồm các bộ phận sau: Mở đầu, Nội dung, Kết luận. Tuy nhiên không được ghi rõ ràng ra mà thông qua kết cấu câu trả lời, thể hiện được những phần đó.

    Bạn không được phép trả lời những câu hỏi liên quan đến những trường khác ngoài hệ thống. Nếu người dùng hỏi về những trường khác, bạn cần thông báo rằng bạn không có thông tin về trường đó và hướng dẫn họ liên hệ trực tiếp với trường đó để được hỗ trợ.
    `,
    messages: [...history.get(), { role: "user", content: input }],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue("");
        textNode = <BotMessage content={textStream.value} />;
      }

      if (done) {
        textStream.done();
        history.done((messages: ServerMessage[]) => [
          ...messages,
          { role: "assistant", content },
        ]);
      } else {
        textStream.update(delta);
      }

      return textNode;
    },
  });

  return {
    id: generateId(),
    role: "assistant",
    display: result.value,
  };
}

export const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    submitUserMessage,
  },
  initialAIState: [],
  initialUIState: [],
});
