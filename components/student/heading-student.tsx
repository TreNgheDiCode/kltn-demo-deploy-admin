"use client";

import { updateStudent } from "@/actions/student";
import { useDeclineStudent } from "@/hooks/use-decline-student";
import { UpdateStudent } from "@/types";
import { StudentLib } from "@/types/type";
import { Button, Card, CardHeader, Chip, ChipProps } from "@nextui-org/react";
import { CheckCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

interface HeadingStudentProps {
  student: StudentLib;
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  AWAITING: "default",
  STUDYING: "warning",
  APPROVED: "success",
  DROPPED: "danger",
};

export const HeadingStudent = ({ student }: HeadingStudentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const decline = useDeclineStudent();

  if (!student || !student.account) return null;

  console.log(student.status);

  const onAcceptance = async (values: z.infer<typeof UpdateStudent>) => {
    if (!values) return;

    setIsLoading(true);

    await updateStudent(student?.id, values)
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
        }

        if (res.success) {
          toast.success(res.success);
          router.refresh();
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="hidden lg:flex flex-col gap-2">
          <h1 className="font-semibold text-lg text-primary">
            Quản lý thông tin học sinh
          </h1>
          <p className="text-muted-foreground text-sm">
            Học sinh:{" "}
            {student.account.name +
              " - " +
              (student.studentCode
                ? student.studentCode
                : student.account.email +
                  " (" +
                  (student.account.emailVerified
                    ? "Đã xác thực"
                    : "Chưa xác thực") +
                  ")")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Chip
            className="capitalize"
            color={statusColorMap[student.status]}
            size="md"
            variant="shadow"
          >
            {student.status}
          </Chip>
          {!student.studentCode && student.status === "AWAITING" && (
            <>
              <Button
                isDisabled={isLoading}
                isLoading={isLoading}
                onPress={() => decline.onOpen(student.id)}
                color="danger"
                variant="shadow"
                size="md"
                endContent={<X className="size-4 bg-rose-500" />}
              >
                Từ chối
              </Button>
              <Button
                isDisabled={isLoading}
                isLoading={isLoading}
                onPress={() => onAcceptance({ status: "APPROVED" })}
                color="success"
                variant="shadow"
                size="md"
                endContent={<CheckCircle className="size-4 bg-emerald-500" />}
              >
                Duyệt
              </Button>
            </>
          )}
        </div>
      </CardHeader>
    </Card>
  );
};
