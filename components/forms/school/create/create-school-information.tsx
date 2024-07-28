"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CreateSchoolFormValues } from "@/data/form-schema";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleFileDropzone } from "@/types/generic";
import Image from "next/image";
import { useState } from "react";
import { Control, FieldErrors, UseFormSetValue } from "react-hook-form";
import { toast } from "sonner";
import { BackgroundDropzone } from "../background-dropzone";
import { SchoolColorPicker } from "../color-picker";
import { LogoDropzone } from "../logo-dropzone";

type Props = {
  control: Control<CreateSchoolFormValues>;
  errors: FieldErrors<CreateSchoolFormValues>;
  setValue: UseFormSetValue<CreateSchoolFormValues>;
};

export const CreateSchoolInformation = ({
  control,
  errors,
  setValue,
}: Props) => {
  const [logo, setLogo] = useState<SingleFileDropzone>();
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [background, setBackground] = useState<
    SingleFileDropzone | undefined
  >();
  const [uploadingBackground, setUploadingBackground] = useState(false);
  const { edgestore } = useEdgeStore();

  const onSelectedLogo = async (value?: SingleFileDropzone) => {
    if (value?.file && value.file instanceof File) {
      setLogo(value);
      setUploadingLogo(true);
      try {
        await edgestore.publicFiles
          .upload({
            file: value.file,
          })
          .then((res) => {
            if (res.url) {
              setLogo({ file: res.url });
              setValue("logo", res.url);
            }
            if (!res.url) {
              toast.error("Có lỗi xảy ra khi tải ảnh lên");

              setLogo(undefined);
            }
          });
      } catch (error) {
        console.error(error);

        setLogo(undefined);
        setUploadingLogo(false);

        toast.error("Có lỗi xảy ra khi tải ảnh lên");
      } finally {
        setUploadingLogo(false);
      }
    }
  };

  const onSelectedBackground = async (value?: SingleFileDropzone) => {
    if (value?.file && value.file instanceof File) {
      setBackground(value);
      setUploadingBackground(true);
      try {
        await edgestore.publicFiles
          .upload({
            file: value.file,
          })
          .then((res) => {
            if (res.url) {
              setBackground({ file: res.url });
              setValue("background", res.url);
            }
            if (!res.url) {
              toast.error("Có lỗi xảy ra khi tải ảnh lên");

              setBackground(undefined);
            }
          });
      } catch (error) {
        console.error(error);

        setBackground(undefined);
        setUploadingBackground(false);

        toast.error("Có lỗi xảy ra khi tải ảnh lên");
      } finally {
        setUploadingBackground(false);
      }
    }
  };

  const buttonClass =
    "bg-main text-white dark:bg-main-component dark:text-main-foreground";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={control}
        name="background"
        render={({ field }) => (
          <FormItem className="col-span-1 md:col-span-2 flex flex-col gap-2">
            <FormLabel className="text-main dark:text-main-foreground">
              Ảnh bìa
            </FormLabel>
            {uploadingBackground ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-main/90 dark:border-main-foreground/90"></div>
              </div>
            ) : (
              <FormControl>
                <BackgroundDropzone
                  disabled={
                    control._formState.isSubmitting || uploadingBackground
                  }
                  value={{ file: field.value } || background}
                  onChange={(file) => {
                    if (file) {
                      onSelectedBackground({ file });
                    }
                  }}
                />
              </FormControl>
            )}
            {field.value && (
              <Button
                disabled={
                  control._formState.isSubmitting || uploadingBackground
                }
                size="sm"
                onClick={() => {
                  field.onChange(undefined);
                  setBackground(undefined);
                }}
                className={buttonClass}
              >
                Xóa ảnh bìa
              </Button>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="size-full">
        <FormField
          control={control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-main dark:text-main-foreground">
                Ảnh đại diện
              </FormLabel>
              {field.value ? (
                <div className="size-full justify-center items-center flex flex-col gap-2">
                  <Avatar className="size-32">
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
                      disabled={control._formState.isSubmitting || !field.value}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        field.onChange(undefined);
                        setLogo(undefined);
                      }}
                      className={buttonClass}
                    >
                      Xóa ảnh đại diện
                    </Button>
                  )}
                </div>
              ) : (
                <FormControl>
                  <LogoDropzone
                    disabled={control._formState.isSubmitting || uploadingLogo}
                    value={{ file: field.value } || logo}
                    onChange={(file) => {
                      if (file) {
                        onSelectedLogo({ file });
                      }
                    }}
                  />
                </FormControl>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="size-full space-y-4">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-main dark:text-main-foreground">
                Tên trường học
              </FormLabel>
              <FormControl>
                <Input
                  disabled={control._formState.isSubmitting}
                  {...field}
                  placeholder="Nhập tên trường học"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-main dark:text-main-foreground">
                Màu chủ đạo
              </FormLabel>
              <FormControl>
                <SchoolColorPicker
                  disabled={control._formState.isSubmitting}
                  onSelect={field.onChange}
                  defaultValue={field.value || "#000000"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-main dark:text-main-foreground">
                Quốc gia
              </FormLabel>
              <FormControl>
                <Select
                  disabled={control._formState.isSubmitting}
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
      </div>
      <FormField
        control={control}
        name="short"
        render={({ field }) => (
          <FormItem className="col-span-1 md:col-span-2">
            <FormLabel className="text-main dark:text-main-foreground">
              Giới thiệu ngắn
            </FormLabel>
            <Textarea
              disabled={control._formState.isSubmitting}
              {...field}
              placeholder="Nhập giới thiệu ngắn"
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
