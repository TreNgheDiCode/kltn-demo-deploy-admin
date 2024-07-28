"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CreateSchoolFormValues } from "@/data/form-schema";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleFileDropzone } from "@/types/generic";
import { useState } from "react";
import { Control, UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { toast } from "sonner";
import { MultiImageDropzone } from "../multi-image-dropzone";

type Props = {
  programIndex: number;
  control: Control<CreateSchoolFormValues>;
  setValue: UseFormSetValue<CreateSchoolFormValues>;
  getValues: UseFormGetValues<CreateSchoolFormValues>;
  btnClass?: string;
};

export const ManageSchoolProgramImages = ({
  programIndex,
  control,
  setValue,
  getValues,
  btnClass,
}: Props) => {
  const [images, setImages] = useState<SingleFileDropzone[]>();
  const [uploadingImages, setUploadingImages] = useState(false);
  const { edgestore } = useEdgeStore();

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
                  setValue(`programs.${index}.images`, [
                    ...(getValues(`programs.${index}.images`) || []),
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

  return (
    <FormField
      control={control}
      name={`programs.${programIndex}.images`}
      render={({ field }) => (
        <FormItem className="col-span-1 md:col-span-2">
          <FormLabel className="text-main dark:text-main-foreground">
            Hình ảnh ngành đào tạo (tùy chọn)
          </FormLabel>
          <FormControl>
            <MultiImageDropzone
              disabled={control._formState.isSubmitting || uploadingImages}
              onChange={(files) => {
                onChangeImages(programIndex, files);
              }}
              value={
                (field.value &&
                  field.value.map((image) => {
                    return { file: image };
                  })) ||
                images
              }
            />
          </FormControl>
          {field.value && (
            <Button
              disabled={control._formState.isSubmitting || uploadingImages}
              size="sm"
              onClick={() => {
                field.onChange([]);
                setImages([]);
              }}
              className={btnClass}
            >
              Xóa tất cả hình ảnh
            </Button>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
