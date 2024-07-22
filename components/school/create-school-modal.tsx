"use client";

import { createSchool } from "@/actions/school";
import { useEdgeStore } from "@/hooks/edgestore";
import { NewSchoolSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Textarea } from "@nextui-org/react";
import { Country } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PickerExample } from "../color-picker";
import { ModalBody, ModalContent, ModalFooter } from "../ui/animated-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  BackgroundFile,
  BackgroundSchoolDropzone,
} from "./background-school-dropzone";
import { LogoFile, LogoSchoolDropzone } from "./logo-school-dropzone";

type CreateSchoolSchema = z.infer<typeof NewSchoolSchema>;

export const CreateSchoolModal = () => {
  const router = useRouter();

  const [logo, setLogo] = useState<LogoFile | undefined>();
  const [background, setBackground] = useState<BackgroundFile | undefined>();

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

  const onSelectedLogo = async (value?: LogoFile) => {
    setLogo(value);

    if (value) {
      setIsUploading(true);
      try {
        const res = await edgestore.publicFiles.upload({
          file: value?.file as File,
          onProgressChange: async (progress) => {
            uploadLogoProgress(progress);

            if (progress === 100) {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              uploadLogoProgress("COMPLETE");
            }
          },
        });

        if (res.url) {
          setLogo({ file: res.url });
          form.setValue("logo", res.url);
        }
      } catch (error: any) {
        toast.error(error.toString());
        setLogo(undefined);
        setIsUploading(false);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const onSelectedBackground = async (value?: BackgroundFile) => {
    setBackground(value);

    if (value) {
      setIsUploading(true);
      try {
        const res = await edgestore.publicFiles.upload({
          file: value?.file as File,
          onProgressChange: async (progress) => {
            uploadBackgroundProgress(progress);

            if (progress === 100) {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              uploadBackgroundProgress("COMPLETE");
            }
          },
        });

        if (res.url) {
          setBackground({ file: res.url });
          form.setValue("background", res.url);
        }
      } catch (error) {
        toast.error("Thay đổi hình nền thất bại");
        setBackground(undefined);
        setIsUploading(false);
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

  const onSubmit = async (values: CreateSchoolSchema) => {
    setIsLoading(true);

    await createSchool(values)
      .then((res) => {
        if (res.success) {
          toast.success(res.success);
          router.refresh();
          return router.push(`/managements/schools`);
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 max-h-[60vh] overflow-y-scroll scrollbar-hide"
      >
        <ModalBody>
          <ModalContent>
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
                        onSelectedFile={onSelectedLogo}
                        value={logo ?? { file: field.value }}
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
                        onSelectedFile={onSelectedBackground}
                        value={background ?? { file: field.value }}
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
                        onSelect={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quốc gia</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={Country.CANADA}
                            placeholder="Chọn một quốc gia"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(Country).map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
          </ModalContent>
          <ModalFooter className="gap-4 grid grid-cols-2">
            <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-full">
              Hủy
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-main text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-full"
            >
              Tạo trường học
            </button>
          </ModalFooter>
        </ModalBody>
      </form>
    </Form>
  );
};
