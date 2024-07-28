"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CreateSchoolFormValues } from "@/data/form-schema";
import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/lib/utils";
import { SingleFileDropzone } from "@/types/generic";
import { AlertTriangleIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormSetValue,
} from "react-hook-form";
import { toast } from "sonner";
import { BackgroundDropzone } from "../background-dropzone";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { MultiImageDropzone } from "../multi-image-dropzone";
import { ManageLocationContacts } from "./manage-location-contacts";

type Props = {
  control: Control<CreateSchoolFormValues>;
  errors: FieldErrors<CreateSchoolFormValues>;
  setValue: UseFormSetValue<CreateSchoolFormValues>;
};

export const CreateSchoolLocation = ({ control, errors, setValue }: Props) => {
  const { append, remove, fields } = useFieldArray({
    control,
    name: `locations`,
  });

  const { edgestore } = useEdgeStore();
  const [cover, setCover] = useState<SingleFileDropzone>();
  const [images, setImages] = useState<SingleFileDropzone[]>();
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

  const onSelectedCover = async (index: number, value?: SingleFileDropzone) => {
    if (value?.file && value.file instanceof File) {
      setCover(value);
      setUploadingCover(true);
      try {
        await edgestore.publicFiles
          .upload({
            file: value.file,
          })
          .then((res) => {
            if (res.url) {
              setCover({ file: res.url });
              setValue(`locations.${index}.cover`, res.url);
            }
            if (!res.url) {
              toast.error("Có lỗi xảy ra khi tải ảnh lên");

              setCover(undefined);
            }
          })
          .finally(() => setUploadingCover(false));
      } catch (error) {
        console.error(error);

        setCover(undefined);
        setUploadingCover(false);

        toast.error("Có lỗi xảy ra khi tải ảnh lên");
      }
    }
  };

  const onSelectedImages = async (
    index: number,
    value?: SingleFileDropzone[]
  ) => {
    if (value) {
      setImages(value);
      setUploadingImages(true);
      try {
        const urls = await Promise.all(
          value.map((file) => {
            if (!file.file) return;

            edgestore.publicFiles
              .upload({
                file: file.file as File,
              })
              .then((res) => {
                if (res.url) {
                  return res.url;
                }
                if (!res.url) {
                  toast.error("Có lỗi xảy ra khi tải ảnh lên");

                  return undefined;
                }
              });
          })
        );

        setValue(
          `locations.${index}.images`,
          urls.filter((url) => url !== undefined)
        );
      } catch (error) {
        console.error(error);

        setImages(undefined);
        setUploadingImages(false);

        toast.error("Có lỗi xảy ra khi tải ảnh lên");
      } finally {
        setUploadingImages(false);
      }
    }
  };

  const onChangeImages = async (
    index: number,
    value?: SingleFileDropzone[]
  ) => {
    if (value) {
      setImages(value);
      setUploadingImages(true);
      try {
        const urls = await Promise.all(
          value.map((file) => {
            if (!file.file) return;

            edgestore.publicFiles
              .upload({
                file: file.file as File,
              })
              .then((res) => {
                if (res.url) {
                  return res.url;
                }
                if (!res.url) {
                  toast.error("Có lỗi xảy ra khi tải ảnh lên");

                  return undefined;
                }
              });
          })
        );

        setValue(
          `locations.${index}.images`,
          urls.filter((url) => url !== undefined)
        );
      } catch (error) {
        console.error(error);

        setImages(undefined);
        setUploadingImages(false);

        toast.error("Có lỗi xảy ra khi tải ảnh lên");
      } finally {
        setUploadingImages(false);
      }
    }
  };

  // const uploadImageProgress = (progress: SingleFileDropzone["progress"]) => {
  //   setImages((prev) =>
  //     prev?.map((file) => {
  //       if (file.file) {
  //         return {
  //           ...file,
  //           progress,
  //         };
  //       }

  //       return file;
  //     })
  //   );
  // };

  return (
    <>
      {fields.map((field, index) => {
        return (
          <Accordion
            key={field.id}
            type="single"
            collapsible
            defaultValue="item-1"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger
                className={cn(
                  "[&[data-state=closed]>button]:hidden [&[data-state=open]>.alert]:hidden relative !no-underline",
                  errors?.locations?.[index] && "text-red-700"
                )}
              >
                {`Cơ sở ${index + 1}`}

                <div className="absolute right-8">
                  <Trash2Icon
                    className="size-4"
                    onClick={() => remove(index)}
                  />
                </div>
                {errors?.locations?.[index] && (
                  <span className="absolute alert right-8">
                    <AlertTriangleIcon className="h-4 w-4   text-red-700" />
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name={`locations.${index}.cover`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel className="text-main dark:text-main-foreground">
                          Ảnh bìa cơ sở
                        </FormLabel>
                        {uploadingCover ? (
                          <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-main/90 dark:border-main-foreground/90"></div>
                          </div>
                        ) : (
                          <FormControl>
                            <BackgroundDropzone
                              disabled={
                                control._formState.isSubmitting ||
                                uploadingCover
                              }
                              value={cover}
                              onChange={(file) => {
                                if (file) {
                                  onSelectedCover(index, { file });
                                }
                              }}
                            />
                          </FormControl>
                        )}
                        {field.value && (
                          <Button
                            disabled={
                              control._formState.isSubmitting || uploadingCover
                            }
                            size="sm"
                            onClick={() => {
                              field.onChange(undefined);
                              setCover(undefined);
                            }}
                          >
                            Xóa ảnh bìa
                          </Button>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="space-y-4 size-ful">
                    <FormField
                      control={control}
                      name={`locations.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-main dark:text-main-foreground">
                            Tên cơ sở
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={control._formState.isSubmitting}
                              {...field}
                              placeholder="Nhập tên cơ sở"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`locations.${index}.address`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-main dark:text-main-foreground">
                            Địa chỉ cơ sở
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={control._formState.isSubmitting}
                              {...field}
                              placeholder="Nhập địa chỉ cơ sở"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`locations.${index}.isMain`}
                      render={({ field }) => (
                        <FormItem className="space-y-2 flex flex-col gap-y-3">
                          <FormLabel className="text-main dark:text-main-foreground">
                            Cơ sở chính?
                          </FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormDescription>
                            Cơ sở chính sẽ được đánh màu đặc biệt và hiển thị ở
                            đầu trang trường học
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={control}
                    name={`locations.${index}.images`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-main dark:text-main-foreground">
                          Hình ảnh cơ sở (tùy chọn)
                        </FormLabel>
                        <FormControl>
                          <MultiImageDropzone
                            disabled={
                              control._formState.isSubmitting || uploadingImages
                            }
                            onChange={(files) => {
                              onChangeImages(index, files);
                            }}
                            onFilesAdded={(files) =>
                              onSelectedImages(index, files)
                            }
                            value={images}
                          />
                        </FormControl>
                        {field.value && (
                          <Button
                            disabled={
                              control._formState.isSubmitting || uploadingImages
                            }
                            size="sm"
                            onClick={() => {
                              field.onChange([]);
                              setImages([]);
                            }}
                          >
                            Xóa tất cả hình ảnh
                          </Button>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="col-span-1 md:col-span-2">
                    <ManageLocationContacts
                      locationIndex={index}
                      control={control}
                      errors={errors}
                      setValue={setValue}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
      <div className="flex justify-center items-center mt-4">
        <button
          disabled={
            control._formState.isSubmitting || uploadingCover || uploadingImages
          }
          type="button"
          onClick={() => {
            append({
              cover: "",
              name: "",
              address: "",
              isMain: false,
            });
          }}
          className="px-4 py-2 rounded-md border border-main font-bold bg-white text-main text-sm hover:shadow-[4px_4px_0px_0px_rgba(125, 31, 31)] transition duration-200"
        >
          Thêm cơ sở khác
        </button>
      </div>
    </>
  );
};
