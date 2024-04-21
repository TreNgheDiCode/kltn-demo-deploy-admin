"use client";

import { updateStudent } from "@/actions/student";
import { useDeclineStudent } from "@/hooks/use-decline-student";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const DeclineStudentModal = () => {
  const { isOpen, onClose, id } = useDeclineStudent();
  const [isLoading, setIsLoading] = useState(false);
  const [additional, setAdditional] = useState("");
  const router = useRouter();

  const onDecline = async () => {
    setIsLoading(true);

    await updateStudent(id, { additional, status: "DROPPED" })
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
        }

        if (res.success) {
          toast.success(res.success);
          router.refresh();
          onClose();
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-[#7D1F1F] dark:text-primary">
              Bạn có chắc chắn muốn từ chối hồ sơ?
            </ModalHeader>
            <ModalBody className="text-primary">
              <Textarea
                size="md"
                variant="bordered"
                label={"Lý do từ chối? (nếu có)"}
                labelPlacement="outside"
                placeholder="Mô tả chi tiết tại đây"
                onValueChange={(value) => setAdditional(value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                isDisabled={isLoading}
                isLoading={isLoading}
                color="danger"
                variant="light"
                onPress={onClose}
              >
                Quay lại
              </Button>
              <Button
                isDisabled={isLoading}
                isLoading={isLoading}
                color="primary"
                onPress={onDecline}
              >
                Đồng ý
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
