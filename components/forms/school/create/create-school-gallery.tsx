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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import { toast } from "sonner";
import { MultiImageDropzone } from "../multi-image-dropzone";
import { ManageSchoolGalleryImages } from "./manage-school-gallery-images";

type Props = {
  control: Control<CreateSchoolFormValues>;
  errors: FieldErrors<CreateSchoolFormValues>;
  setValue: UseFormSetValue<CreateSchoolFormValues>;
  getValues: UseFormGetValues<CreateSchoolFormValues>;
};
export const CreateSchoolGallery = ({
  control,
  errors,
  setValue,
  getValues,
}: Props) => {
  const { append, remove, fields } = useFieldArray({
    control,
    name: `galleries`,
  });

  const { edgestore } = useEdgeStore();
  const [images, setImages] = useState<SingleFileDropzone[]>();
  const [uploadingImages, setUploadingImages] = useState(false);

  const onChangeImages = async (
    index: number,
    value?: SingleFileDropzone[]
  ) => {
    if (value) {
      setImages(value);
      setUploadingImages(true);
      try {
        await Promise.all(
          value.map((file) => {
            if (!file.file) return;

            edgestore.publicFiles
              .upload({
                file: file.file as File,
                onProgressChange: (progress) => {
                  uploadImageProgress(progress);
                },
              })
              .then((res) => {
                if (res.url) {
                  setValue(`galleries.${index}.images`, [
                    ...(getValues(`galleries.${index}.images`) || []),
                    res.url,
                  ]);
                }
                if (!res.url) {
                  toast.error("Có lỗi xảy ra khi tải ảnh lên");

                  return undefined;
                }
              })
              .finally(() => {
                setUploadingImages(false);
              });
          })
        );
      } catch (error) {
        console.error(error);

        setImages(undefined);
        setUploadingImages(false);

        toast.error("Có lỗi xảy ra khi tải ảnh lên");
      }
    }
  };

  const uploadImageProgress = (progress: SingleFileDropzone["progress"]) => {
    setImages((prev) =>
      prev?.map((file) => {
        if (file.file) {
          return {
            ...file,
            progress,
          };
        }

        return file;
      })
    );
  };

  const buttonClass =
    "bg-main dark:bg-main-component text-white dark:text-main-foreground";

  return (
    <>
      {fields.map((field, index) => (
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
                errors?.galleries?.[index] && "text-red-700"
              )}
            >
              {`Bộ sưu tập ${index + 1}`}

              <div className="absolute right-8">
                <Trash2Icon className="size-4" onClick={() => remove(index)} />
              </div>
              {errors?.galleries?.[index] && (
                <span className="absolute alert right-8">
                  <AlertTriangleIcon className="h-4 w-4   text-red-700" />
                </span>
              )}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name={`galleries.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-main dark:text-main-foreground">
                        Tên bộ sưu tập
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={control._formState.isSubmitting}
                          {...field}
                          placeholder="Nhập tên bộ sưu tập"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`galleries.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-main dark:text-main-foreground">
                        Mô tả
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={control._formState.isSubmitting}
                          {...field}
                          placeholder="Nhập mô tả"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <ManageSchoolGalleryImages
                  control={control}
                  setValue={setValue}
                  getValues={getValues}
                  galleryIndex={index}
                  btnClass={buttonClass}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
      <div className="flex justify-center items-center mt-4">
        <button
          disabled={control._formState.isSubmitting}
          type="button"
          onClick={() => {
            append({
              name: "",
              description: "",
            });
          }}
          className="px-4 py-2 rounded-md border border-main dark:border-main-component font-bold bg-main dark:bg-main-component text-white dark:text-main-foreground text-sm hover:shadow-[4px_4px_0px_0px_rgba(125, 31, 31)] transition duration-200"
        >
          Thêm bộ sưu tập khác
        </button>
      </div>
    </>
  );
};
