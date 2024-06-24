"use client";

import { ContactLib, StudentLib } from "@/types/type";
import { Tab, Tabs } from "@nextui-org/react";
import { ContactsTable } from "../contacts/contacts-table";

interface StudentNavigationProps {
  student: StudentLib;
  contacts: ContactLib[];
}

export const StudentNavigation = ({
  student,
  contacts,
}: Readonly<StudentNavigationProps>) => {
  return (
    <Tabs
      variant="underlined"
      className="w-full"
      classNames={{ tabList: "flex-1" }}
    >
      <Tab key="scores" title="Điểm số"></Tab>
      <Tab key="posts" title="Bài đăng"></Tab>
      <Tab key="contacts" title="Liên hệ & Hỗ trợ">
        <ContactsTable contacts={contacts} />
      </Tab>
    </Tabs>
  );
};
