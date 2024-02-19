"use client";

import { UserButton, clerkClient, useClerk, useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { MoreHorizontal } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { useState } from "react";
import { toast } from "sonner";
import { update } from "@/actions/user";
import { nameSchema } from "@/types";
import { useRouter } from "next/navigation";

type formType = z.infer<typeof nameSchema>;

export const UserMenu = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const form = useForm<formType>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      firstName: "",
    },
  });

  const disabled = form.formState.isDirty;

  const onSubmit = async (values: formType) => {
    setLoading(true);

    await update(values)
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
        }

        if (res.success) {
          toast.success(res.success);
        }
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
          onClose();
          window.location.reload();
        }, 2000);
      });
  };

  const onClick = () => {
    setOpen(false);
    onOpen();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} backdrop="blur">
        <ModalContent>
          <ModalHeader>Cập nhật tên hiển thị mới</ModalHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <ModalBody>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={loading}
                          label="Tên hiển thị"
                          labelPlacement="outside"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  disabled={loading}
                  color="primary"
                  endContent={loading && <Spinner color="success" size="sm" />}
                >
                  Xác nhận
                </Button>
              </ModalFooter>
            </form>
          </Form>
        </ModalContent>
      </Modal>
      <Card className="p-0">
        <CardBody className="flex-row items-center justify-start gap-2">
          <UserButton />
          <div className="flex flex-col items-start justify-center">
            <span className="font-semibold text-sm">
              {user?.fullName || "[Chưa định danh]"}
            </span>
            <span className="text-xs">
              {user?.primaryEmailAddress?.emailAddress}
            </span>
          </div>
          <Popover isOpen={open} showArrow={true} shadow="lg" radius="sm">
            <PopoverTrigger onClick={() => setOpen((value) => !value)}>
              <MoreHorizontal className="h-6 w-6 ml-auto cursor-pointer text-gray-300 hover:text-primary" />
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Button
                onClick={onClick}
                radius="sm"
                variant="light"
                className="px-2 py-1"
              >
                Chỉnh sửa tên
              </Button>
            </PopoverContent>
          </Popover>
        </CardBody>
      </Card>
    </>
  );
};
