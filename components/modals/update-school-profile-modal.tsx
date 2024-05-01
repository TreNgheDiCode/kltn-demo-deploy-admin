"use client";

import {
  UpdateName,
  UpdateShort,
  updateBackground,
  updateLogo,
  updateStatus,
} from "@/actions/school";
import { useEdgeStore } from "@/hooks/edgestore";
import { useUpdateSchoolProfile } from "@/hooks/use-update-school-profile";
import {
  Button,
  Chip,
  Divider,
  Input,
  Radio,
  RadioGroup,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PickerExample } from "../color-picker";
import {
  BackgroundFile,
  BackgroundSchoolDropzone,
} from "../school/background-school-dropzone";
import { LogoFile, LogoSchoolDropzone } from "../school/logo-school-dropzone";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const UpdateSchoolProfileModal = () => {
  const router = useRouter();
  const { isOpen, onClose, data } = useUpdateSchoolProfile();

  const [color, setColor] = useState(data.color);
  const [name, setName] = useState(data.name);
  const [short, setShort] = useState(data.short);
  const [logo, setLogo] = useState<LogoFile | undefined>({ file: data.logo });
  const [background, setBackground] = useState<LogoFile | undefined>({
    file: data.logo,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { edgestore } = useEdgeStore();

  const onSelectedLogo = async (value?: LogoFile) => {
    setLogo(value);

    if (value) {
      setIsUploading(true);
      try {
        const res = await edgestore.publicFiles.upload({
          file: value?.file as File,
          options: {
            replaceTargetUrl: data.logo ?? undefined,
          },
          onProgressChange: async (progress) => {
            uploadLogoProgress(progress);

            if (progress === 100) {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              uploadLogoProgress("COMPLETE");
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

  const onStatusChange = async (e: boolean) => {
    setStatus(e);
    setIsLoading(true);

    await updateStatus(data.id, e)
      .then((res) => {
        if (res.success) {
          toast.success(res.success);
        }

        if (res.error) {
          toast.error(res.error);
        }
      })
      .finally(() => setIsLoading(false));

    router.refresh();
    onClose();
  };

  const onSelectedBackground = async (value?: BackgroundFile) => {
    setBackground(value);

    if (value) {
      setIsUploading(true);
      try {
        const res = await edgestore.publicFiles.upload({
          file: value?.file as File,
          options: {
            replaceTargetUrl: data.background ?? undefined,
          },
          onProgressChange: async (progress) => {
            uploadBackgroundProgress(progress);

            if (progress === 100) {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              uploadBackgroundProgress("COMPLETE");
            }
          },
        });

        if (res.url) {
          await updateBackground(data.id, res.url).then((res) => {
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
        toast.error("Thay đổi hình nền thất bại");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const uploadLogoProgress = (progress: LogoFile["progress"]) => {
    setLogo((file) => {
      const newFile = structuredClone(file);

      if (newFile) {
        newFile.progress = progress;
      }

      return newFile;
    });
  };

  const uploadBackgroundProgress = (progress: BackgroundFile["progress"]) => {
    setBackground((file) => {
      const newFile = structuredClone(file);

      if (newFile) {
        newFile.progress = progress;
      }

      return newFile;
    });
  };

  useEffect(() => {
    setColor(data.color);
    setName(data.name);
    setShort(data.short);
    setLogo({ file: data.logo });
    setBackground({ file: data.background });
    setStatus(data.isPublished);
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

  const updateShort = async () => {
    if (short) {
      await UpdateShort(data.id, short).then((res) => {
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
          <DialogDescription>
            Chỉnh sửa các thông tin hiển thị của trường
          </DialogDescription>
        </DialogHeader>
        <Divider />
        <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-scroll scrollbar-hide">
          <div>
            <h1 className="text-primary font-semibold text-lg">Ảnh đại diện</h1>
            <LogoSchoolDropzone
              disabled={isUploading}
              onSelectedFile={onSelectedLogo}
              value={logo}
            />
          </div>
          <div>
            <h1 className="text-primary font-semibold text-lg">Hình nền</h1>
            <BackgroundSchoolDropzone
              disabled={isUploading}
              onSelectedFile={onSelectedBackground}
              value={background}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-primary font-semibold text-lg">Mã màu</h1>
            <PickerExample
              color={data.color || "#FFFFFF"}
              id={data.id}
              onClose={onClose}
            />
          </div>
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
              inputWrapper:
                "pr-0 group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-offset-0",
              label: "text-primary font-semibold text-lg",
            }}
          />
          <Textarea
            label="Giới thiệu ngắn"
            labelPlacement="outside"
            size="md"
            onValueChange={setShort}
            value={short}
            placeholder="Nhập giới thiệu ngắn cho trường của bạn"
            endContent={
              short !== data.short && (
                <Button variant="ghost" onClick={updateShort}>
                  Lưu
                </Button>
              )
            }
            classNames={{
              inputWrapper:
                "pr-0 group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-offset-0",
              label: "text-primary font-semibold text-lg",
              input: "scrollbar-hide",
            }}
          />
          <div className="space-y-2">
            <h1 className="text-primary font-semibold text-lg">Trạng thái</h1>
            <RadioGroup
              isDisabled={isLoading}
              defaultValue={status.toString()}
              onValueChange={(e) => onStatusChange(e === "true")}
            >
              <Radio
                value={"true"}
                description="Hiển thị trường công khai với người dùng (Phạm vi: API/UI)"
              >
                <Chip
                  variant="bordered"
                  color="success"
                  className="max-w-full w-full"
                  classNames={{
                    content: "text-center",
                  }}
                >
                  Kích hoạt
                </Chip>
              </Radio>
              <Radio
                value={"false"}
                description="Ẩn trường khỏi các hoạt động tìm kiếm và thể hiện nội dung"
              >
                <Chip
                  variant="bordered"
                  color="default"
                  className="max-w-full w-full"
                  classNames={{
                    content: "text-center",
                  }}
                >
                  Tạm ẩn
                </Chip>
              </Radio>
            </RadioGroup>
          </div>
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

export default UpdateSchoolProfileModal;
