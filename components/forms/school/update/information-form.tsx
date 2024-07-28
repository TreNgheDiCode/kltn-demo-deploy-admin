"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SchoolInformationFormValues,
  SchoolInformationSchema,
} from "@/data/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { School } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../../../ui/animated-modal";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import { Input } from "../../../ui/input";
import { Textarea } from "../../../ui/textarea";
import { SchoolColorPicker } from "../color-picker";
import { UpdateSchoolInformation } from "@/action/school";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SingleFileDropzone } from "@/types/generic";

type Props = {
  school: School;
};

export const InformationForm = ({ school }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [logo, setLogo] = useState<SingleFileDropzone>({ file: school.logo });
  const [background, setBackground] = useState<SingleFileDropzone>({
    file: school.background,
  });

  const form = useForm<SchoolInformationFormValues>({
    resolver: zodResolver(SchoolInformationSchema),
    mode: "all",
    defaultValues: {
      ...school,
      short: school.short || "",
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;

  const onSubmit = async (values: SchoolInformationFormValues) => {
    setLoading(true);
    await UpdateSchoolInformation(school.id, values)
      .then((res) => {
        if (typeof res.error === "string") {
          toast.error(res.error);
        }

        if (res.success) {
          toast.success(res.success);
          reset();
          router.refresh();
          window.location.reload();
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Modal>
      <ModalTrigger>
        <div className="shadow-[0_0_0_3px_#7d1f1f] dark:shadow-[0_0_0_3px_#ffffff] px-6 py-2 bg-transparent border border-main dark:border-main-foreground dark:text-main-foreground text-main rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
          Xem thông tin
        </div>
      </ModalTrigger>
      <ModalBody>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalContent className="max-h-[30rem] overflow-y-scroll">
              <h4 className="text-lg md:text-2xl text-main dark:text-main-foreground font-bold text-center mb-8">
                Thông tin trường học
              </h4>

              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên trường học</FormLabel>
                    <FormControl>
                      <Input disabled={!isUpdating} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="short"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giới thiệu ngắn</FormLabel>
                    <FormControl>
                      <Textarea disabled={!isUpdating} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ảnh đại diện</FormLabel>
                    {logo.file ? (
                      <div className="size-full justify-center items-center flex flex-col gap-2">
                        <Avatar className="size-24">
                          <AvatarImage src={field.value} alt={field.name} />
                          <AvatarFallback>
                            <Image
                              src={"/logo_icon_light.png"}
                              alt="School logo"
                              fill
                              objectFit="cover"
                            />
                          </AvatarFallback>
                        </Avatar>
                        {field.value && (
                          <Button
                            disabled={!isUpdating}
                            variant="outline"
                            size="sm"
                          >
                            Xóa ảnh đại diện
                          </Button>
                        )}
                      </div>
                    ) : (
                      <FormControl></FormControl>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="background"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ảnh bìa</FormLabel>
                    {background.file ? (
                      <div className="flex flex-col gap-4">
                        <div className="h-48 w-full relative">
                          <Image
                            src={field.value}
                            alt={field.name}
                            className="rounded-md object-cover hover:scale-110 transition"
                            fill
                            quality={100}
                            priority
                          />
                        </div>
                        <Button
                          disabled={!isUpdating}
                          variant="outline"
                          size="sm"
                        >
                          Xóa ảnh bìa
                        </Button>
                      </div>
                    ) : (
                      <FormControl></FormControl>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Màu chủ đạo</FormLabel>
                    <FormControl>
                      <SchoolColorPicker
                        disabled={!isUpdating}
                        onSelect={field.onChange}
                        defaultValue={field.value}
                      />
                    </FormControl>
                    <FormDescription>
                      *Dùng trong tùy chỉnh màu sắc chuyển tiếp trên ảnh bìa
                      trang chủ người dùng
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quốc gia</FormLabel>
                    <FormControl>
                      <Select
                        disabled={!isUpdating}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn quốc gia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AUSTRALIA">Australia</SelectItem>
                          <SelectItem value="CANADA">Canada</SelectItem>
                          <SelectItem value="KOREA">Korea</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="isPublished"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chế độ</FormLabel>
                    <Select
                      disabled={!isUpdating}
                      onValueChange={(value) => {
                        if (value === "true") {
                          field.onChange(true);
                        }

                        if (value === "false") {
                          field.onChange(false);
                        }
                      }}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn chế độ hiển thị" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={"true"}>Hiển thị</SelectItem>
                        <SelectItem value={"false"}>Tạm ẩn</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </ModalContent>
            <ModalFooter
              disabled={loading}
              confirmContent={
                <button
                  disabled={!isUpdating || loading}
                  className="bg-main text-white dark:bg-main-component dark:text-main-foreground text-sm px-2 py-1 rounded-md border border-main dark:border-main-foreground w-28 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cập nhật
                </button>
              }
              onConfirm={handleSubmit(onSubmit)}
              className="gap-1 justify-center flex-col items-center"
            >
              <span className="text-center italic text-main text-xs dark:text-main-foreground">
                Vui lòng{" "}
                <a onClick={() => setIsUpdating((value) => !value)}>
                  <strong className="underline cursor-pointer text-red-500">
                    nhấn vào đây
                  </strong>
                </a>{" "}
                để {isUpdating ? "tắt" : "bật"} chế độ chỉnh sửa
              </span>
            </ModalFooter>
          </form>
        </Form>
      </ModalBody>
    </Modal>
  );
};
