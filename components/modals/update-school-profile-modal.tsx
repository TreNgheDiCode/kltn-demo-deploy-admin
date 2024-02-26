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
import { UpdateName, updateLogo } from "@/actions/school";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LogoFile, LogoSchoolDropzone } from "../school/logo-school-dropzone";
import { useEdgeStore } from "@/hooks/edgestore";
import { progress } from "framer-motion";

export const UpdateSchoolProfileModal = () => {
  const router = useRouter();
  const { isOpen, onClose, data } = useUpdateSchoolProfile();

  const [name, setName] = useState(data.name);
  const [file, setFile] = useState<LogoFile | undefined>({ file: data.logo });
  const [isUploading, setIsUploading] = useState(false);

  const { edgestore } = useEdgeStore();

  const onSelectedFile = async (value?: LogoFile) => {
    setFile(value);

    if (value) {
      setIsUploading(true);
      try {
        const res = await edgestore.publicFiles.upload({
          file: value?.file as File,
          options: {
            replaceTargetUrl: data.logo ?? undefined,
          },
          onProgressChange: async (progress) => {
            uploadImageProgress(progress);

            if (progress === 100) {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              uploadImageProgress("COMPLETE");
            }
          },
        });

        if (res.url) {
          await updateLogo(data.id, res.url).then((res) => {
            if (res.success) {
              toast.success(res.success);
            }

            if (res.error) {
              toast.error(res.error);
            }
          });
        }

        router.refresh();
        onClose();
      } catch (error) {
        console.log(error);
        toast.error("Thay đổi ảnh đại diện thất bại");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const uploadImageProgress = (progress: LogoFile["progress"]) => {
    setFile((file) => {
      const newFile = structuredClone(file);

      if (newFile) {
        console.log("meo");
        newFile.progress = progress;
      }

      return newFile;
    });
  };

  useEffect(() => {
    setName(data.name);
    setFile({ file: data.logo });
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
          <LogoSchoolDropzone
            disabled={isUploading}
            onSelectedFile={onSelectedFile}
            value={file}
          />
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
