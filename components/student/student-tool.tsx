"use client";

import { StudentLib } from "@/types/type";
import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { Key, Lock, Mail, Pencil } from "lucide-react";

interface StudentToolProps {
  student: StudentLib;
}

export const StudentTool = ({ student }: Readonly<StudentToolProps>) => {
  return (
    <Card>
      <CardHeader>
        <h1 className="font-bold text-[#7D1F1F] text-base dark:text-primary">
          Công cụ hỗ trợ
        </h1>
      </CardHeader>
      <Divider />
      <CardBody className="gap-4">
        <Button variant="shadow" startContent={<Pencil className="size-4" />}>
          Chỉnh sửa thông tin
        </Button>
        <Button variant="shadow" startContent={<Key className="size-4" />}>
          Gửi y/c khôi phục mật khẩu
        </Button>
        <Button variant="shadow" startContent={<Mail className="size-4" />}>
          Gửi y/c xác thực email
        </Button>
        <Button
          color="danger"
          variant="shadow"
          startContent={<Lock className="bg-rose-500 size-4" />}
        >
          Khóa tài khoản
        </Button>
      </CardBody>
    </Card>
  );
};
