"use client";

import { FeedbackLib, StudentLib } from "@/types/type";
import { Tab, Tabs } from "@nextui-org/react";
import { FeedbacksTable } from "../feedbacks/feedbacks-table";

interface StudentNavigationProps {
  student: StudentLib;
  feedbacks: FeedbackLib[];
}

export const StudentNavigation = ({
  student,
  feedbacks,
}: Readonly<StudentNavigationProps>) => {
  return (
    <Tabs
      variant="underlined"
      className="w-full"
      classNames={{ tabList: "flex-1" }}
    >
      <Tab key="scores" title="Điểm số"></Tab>
      <Tab key="posts" title="Bài đăng"></Tab>
      <Tab key="feedbacks" title="Liên hệ & Hỗ trợ">
        <FeedbacksTable feedbacks={feedbacks} />
      </Tab>
    </Tabs>
  );
};
