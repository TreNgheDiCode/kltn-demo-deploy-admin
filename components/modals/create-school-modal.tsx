"use client";

import { createSchool } from "@/actions/school";
import { useEdgeStore } from "@/hooks/edgestore";
import { useCreateSchool } from "@/hooks/use-create-school";
import { NewSchoolSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, Input, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

type CreateSchoolSchema = z.infer<typeof NewSchoolSchema>;

export const CreateSchoolModal = () => {
  const router = useRouter();
  const { isOpen, onClose } = useCreateSchool();

  const [logo, setLogo] = useState<File>();
  const [background, setBackground] = useState<File>();

  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { edgestore } = useEdgeStore();

  const form = useForm<CreateSchoolSchema>({
    resolver: zodResolver(NewSchoolSchema),
    defaultValues: {
      background: "",
      logo: "",
      name: "",
      short: "",
      color: "",
    },
  });

  const onSelectedLogo = async (file?: File) => {
    if (file) {
      setLogo(file);

      try {
        const res = await edgestore.publicFiles.upload({
          file: file,
        });

        if (res.url) {
          toast.success("Đăng tải hình ảnh thành công");
          form.setValue("logo", res.url);
        }
      } catch (error) {
        console.log(error);
        toast.error("Đăng tải ảnh đại diện thất bại");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const onSelectedBackground = async (file?: File) => {
    if (file) {
      setLogo(file);

      try {
        const res = await edgestore.publicFiles.upload({
          file,
        });

        if (res.url) {
          form.setValue("background", res.url);
        }
      } catch (error) {
        console.log(error);
        toast.error("Đăng tải hình nền thất bại");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const onSubmit = async (values: CreateSchoolSchema) => {
    setIsLoading(true);

    await createSchool(values)
      .then((res) => {
        if (res.success) {
          toast.success(res.success);
          router.refresh();
          onClose();
        }

        if (res.error) {
          toast.error(res.error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm trường học mới</DialogTitle>
          <DialogDescription>
            Điền vào các thông tin cho trường học mới
          </DialogDescription>
        </DialogHeader>
        <Divider />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3 max-h-[60vh] overflow-y-scroll scrollbar-hide"
          >
            <div>
              <h1 className="text-primary font-semibold text-lg">
                Ảnh đại diện
              </h1>
              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <LogoSchoolDropzone
                        disabled={isUploading}
                        onSelectedFile={(e) => {
                          onSelectedLogo(e?.file as File);
                        }}
                        value={{ file: field.value }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <h1 className="text-primary font-semibold text-lg">Hình nền</h1>
              <FormField
                control={form.control}
                name="background"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <BackgroundSchoolDropzone
                        disabled={isUploading}
                        onSelectedFile={(e) => {
                          onSelectedBackground(e?.file as File);
                        }}
                        value={{ file: field.value }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-primary font-semibold text-lg">Mã màu</h1>
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormControl>
                      <PickerExample
                        isCreate={true}
                        color={field.value}
                        onClose={onClose}
                        onSelect={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormControl>
                      <Input
                        isRequired
                        label="Tên trường"
                        labelPlacement="outside"
                        size="md"
                        onValueChange={field.onChange}
                        value={field.value}
                        placeholder="Nhập tên cho trường của bạn"
                        classNames={{
                          inputWrapper:
                            "pr-0 group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-offset-0",
                          label: "text-primary font-semibold text-lg",
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="short"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormControl>
                      <Textarea
                        isRequired
                        label="Giới thiệu ngắn"
                        labelPlacement="outside"
                        size="md"
                        onValueChange={field.onChange}
                        value={field.value}
                        placeholder="Nhập giới thiệu ngắn cho trường của bạn"
                        classNames={{
                          inputWrapper:
                            "pr-0 group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-offset-0",
                          label: "text-primary font-semibold text-lg",
                          input: "scrollbar-hide",
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                isLoading={isLoading}
                isDisabled={isLoading}
                type="submit"
                variant="shadow"
                color="primary"
                className="w-full"
              >
                Thêm trường học
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
