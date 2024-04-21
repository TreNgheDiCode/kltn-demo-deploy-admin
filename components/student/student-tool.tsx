"use client";

import {
  sendEmailVerfication,
  sendPasswordReset,
  updateStudent,
} from "@/actions/student";
import { useModalAction } from "@/hooks/use-modal-action";
import { useUpdateAccount } from "@/hooks/use-update-account";
import { StudentLib } from "@/types/type";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Textarea,
} from "@nextui-org/react";
import { Key, Lock, Mail, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface StudentToolProps {
  student: StudentLib;
}

export const StudentTool = ({ student }: Readonly<StudentToolProps>) => {
  const [isLoading, setIsLoading] = useState(false);
  const cancel = useModalAction();
  const router = useRouter();
  const account = useUpdateAccount();

  const onPasswordReset = async () => {
    if (!student || !student.account) return;

    setIsLoading(true);

    await sendPasswordReset(student.account.email, student.account.name)
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
        }

        if (res.success) {
          toast.success(res.success);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const onEmailVerification = async () => {
    if (!student || !student.account) return;

    setIsLoading(true);

    await sendEmailVerfication(student.account.email, student.account.name)
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
        }

        if (res.success) {
          toast.success(res.success);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const onLockAccount = async () => {
    if (!student) return;

    setIsLoading(true);

    await updateStudent(student.id, { isLocked: true })
      .then((res) => {
        if (res.success) {
          toast.success(res.success);
          router.refresh();
          cancel.onClose();
        }

        if (res.error) {
          toast.error(res.error);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const onUnlockAccount = async () => {
    if (!student) return;

    setIsLoading(true);

    await updateStudent(student.id, { isLocked: false })
      .then((res) => {
        if (res.success) {
          toast.success(res.success);
          router.refresh();
          cancel.onClose();
        }

        if (res.error) {
          toast.error(res.error);
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Card>
      <CardHeader>
        <h1 className="font-bold text-[#7D1F1F] text-base dark:text-primary">
          Công cụ hỗ trợ
        </h1>
      </CardHeader>
      <Divider />
      <CardBody className="gap-4">
        <Button
          isLoading={isLoading}
          isDisabled={isLoading}
          onPress={() => account.onOpen(student)}
          variant="shadow"
          startContent={<Pencil className="size-4" />}
        >
          Chỉnh sửa thông tin
        </Button>
        {!student?.account?.isLocked && (
          <>
            <Button
              isLoading={isLoading}
              isDisabled={isLoading}
              onPress={onPasswordReset}
              variant="shadow"
              startContent={<Key className="size-4" />}
            >
              Gửi y/c khôi phục mật khẩu
            </Button>
            {!student?.account?.emailVerified && (
              <Button
                isLoading={isLoading}
                isDisabled={isLoading}
                onPress={onEmailVerification}
                variant="shadow"
                startContent={<Mail className="size-4" />}
              >
                Gửi y/c xác thực email
              </Button>
            )}
          </>
        )}
        {!student?.account?.isLocked && (
          <Button
            isLoading={isLoading}
            isDisabled={isLoading}
            onPress={() =>
              cancel.onOpen(
                onLockAccount,
                "Bạn có chắc chắn muốn khóa tài khoản này?",
                "Sau khi khóa, tài khoản sẽ không thể thực hiện bất kỳ truy cập nào đến tài khoản!"
              )
            }
            color="danger"
            variant="shadow"
            startContent={<Lock className="size-4" />}
          >
            Khóa tài khoản
          </Button>
        )}
        {student?.account?.isLocked && (
          <Button
            isLoading={isLoading}
            isDisabled={isLoading}
            onPress={() =>
              cancel.onOpen(
                onUnlockAccount,
                "Bạn có chắc chắn muốn mở khóa tài khoản này?",
                "Sau khi mở khóa, tài khoản sẽ được khôi phục tất cả truy cập đến tài khoản!"
              )
            }
            color="success"
            variant="shadow"
            startContent={<Lock className="size-4" />}
          >
            Mở khóa tài khoản
          </Button>
        )}
      </CardBody>
      <Divider />
      <CardFooter className="flex-col items-start">
        <h1 className="font-bold text-[#7D1F1F] text-base dark:text-primary">
          Thông tin bổ sung
        </h1>
        <Textarea
          variant="faded"
          color="warning"
          isReadOnly
          value={student?.additional || "Không có thông tin"}
        />
      </CardFooter>
    </Card>
  );
};
