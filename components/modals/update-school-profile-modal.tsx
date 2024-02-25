"use client";

import { useUpdateSchoolProfile } from "@/hooks/use-update-school-profile";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { UpdateName } from "@/actions/school";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const UpdateSchoolProfileModal = () => {
  const router = useRouter();
  const { isOpen, onClose, data } = useUpdateSchoolProfile();
  const [name, setName] = useState(data.name);

  useEffect(() => {
    setName(data.name);
  }, [data]);

  const updateName = async () => {
    if (name) {
      await UpdateName(data.id, name).then((res) => {
        if (res.success) {
          toast.success(res.success);
        }

        if (res.error) {
          toast.error(res.error);
        }
      });
    }

    onClose();
    router.refresh();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cập nhật thông tin</DialogTitle>
        </DialogHeader>
        <div className="divide-black flex flex-col gap-3">
          <div>Logo</div>
          <div>Background</div>
          <Input
            label="Tên trường"
            labelPlacement="outside"
            size="md"
            onValueChange={setName}
            value={name}
            placeholder="Nhập tên cho trường của bạn"
            endContent={
              name !== data.name && (
                <Button variant="ghost" onClick={updateName}>
                  Lưu
                </Button>
              )
            }
            classNames={{
              inputWrapper: "pr-0",
            }}
          />
          <div>Status</div>
        </div>
        <DialogFooter>
          <Button
            onClick={onClose}
            variant="shadow"
            color="primary"
            className="w-full"
          >
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
