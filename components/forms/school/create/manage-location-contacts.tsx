"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateSchoolFormValues } from "@/data/form-schema";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormSetValue,
} from "react-hook-form";

type Props = {
  locationIndex: number;
  control: Control<CreateSchoolFormValues>;
  errors: FieldErrors<CreateSchoolFormValues>;
  setValue: UseFormSetValue<CreateSchoolFormValues>;
};

export const ManageLocationContacts = ({
  locationIndex,
  control,
  errors,
  setValue,
}: Props) => {
  const { append, remove, fields } = useFieldArray({
    control,
    name: `locations.${locationIndex}.contacts`,
  });

  return (
    <>
      {fields.map((field, index) => (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <FormField
            control={control}
            name={`locations.${locationIndex}.contacts.${index}.email`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email (tùy chọn)</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`locations.${locationIndex}.contacts.${index}.phone`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số điện thoại (tùy chọn)</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập số điện thoại" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`locations.${locationIndex}.contacts.${index}.fax`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fax (tùy chọn)</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập fax" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`locations.${locationIndex}.contacts.${index}.hours`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giờ làm việc (tùy chọn)</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập giờ làm việc" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`locations.${locationIndex}.contacts.${index}.url`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website (tùy chọn)</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập website" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant={"destructive"}
            size={"sm"}
            onClick={() => remove(index)}
          >
            Xóa
          </Button>
        </div>
      ))}
      <div className="flex justify-center items-center mt-4">
        <button
          disabled={control._formState.isSubmitting}
          type="button"
          onClick={() => {
            append({});
          }}
          className="px-4 py-2 rounded-md border border-main font-bold bg-white text-main text-sm hover:shadow-[4px_4px_0px_0px_rgba(125, 31, 31)] transition duration-200"
        >
          Thêm liên hệ khác
        </button>
      </div>
    </>
  );
};
