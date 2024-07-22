"use client";

import "quill/dist/quill.snow.css";

import { useEdgeStore } from "@/hooks/edgestore";
import { useSchools } from "@/hooks/use-schools";
import { NewsSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  ChipProps,
  Divider,
  Image,
  Input,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { NewsType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SingleImageDropzone } from "../single-image-dropzone";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { QuillEditor } from "./quill-editor";
import { createNews, deleteNews } from "@/actions/news";
import { toast } from "sonner";
import { NewsLib } from "@/types/type";
import Banner from "../banner";
import { X } from "lucide-react";
import { useModalAction } from "@/hooks/use-modal-action";

type NewsSchema = z.infer<typeof NewsSchema>;

interface NewsFormProps {
  isPreview?: boolean;
  initialData?: NewsLib;
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  true: "success",
  false: "default",
};

const statusLabelMap = {
  true: "Hiển thị",
  false: "Tạm ẩn",
};

const newsType = [
  {
    key: NewsType.ANNOUNCEMENT,
    label: "Thông báo",
    color: "default",
  },
  {
    key: NewsType.EVENT,
    label: "Sự kiện",
    color: "warning",
  },
  {
    key: NewsType.BLOG,
    label: "Blog",
    color: "success",
  },
];

const typeColorMap: Record<string, ChipProps["color"]> = {
  ANNOUNCEMENT: "default",
  EVENT: "warning",
  BLOG: "success",
};

export const NewsForm = ({
  isPreview,
  initialData,
}: Readonly<NewsFormProps>) => {
  const action = useModalAction();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);

  const { edgestore } = useEdgeStore();

  const schools = useSchools();

  console.log(schools);

  const form = useForm<NewsSchema>({
    resolver: zodResolver(NewsSchema),
    mode: "all",
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      cover: initialData?.cover || "",
      isPublished: initialData?.isPublished || false,
      type: initialData?.type || NewsType.ANNOUNCEMENT,
      schoolId: initialData?.schoolId || undefined,
    },
  });

  form.watch("cover");

  if (!schools) {
    return (
      <div className="flex items-center justify-center">
        <Spinner
          color="success"
          label="Đang tải thông tin cần thiết..."
          size="lg"
        />
      </div>
    );
  }

  const onSubmit = async (values: NewsSchema) => {
    setIsLoading(true);
    values.isPublished = true;

    if (isPreview) {
      values.id = initialData?.id;
    }

    await createNews(values)
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
        }

        if (res.success) {
          router.push("/managements/news");
          router.refresh();
          toast.success(res.success);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const onSave = async (values: NewsSchema) => {
    setIsLoading(true);
    values.isPublished = false;

    if (isPreview) {
      values.id = initialData?.id;
    }

    await createNews(values)
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
        }

        if (res.success) {
          toast.success(res.success);
          router.refresh();
          router.push("/managements/news");
        }
      })
      .finally(() => setIsLoading(false));
  };

  const onSelect = (file?: File) => {
    setFile(file);
  };

  const onUpload = async () => {
    setIsUploading(true);
    if (file) {
      const res = await edgestore.publicFiles
        .upload({ file })
        .finally(() => setIsUploading(false));

      if (res) {
        form.setValue("cover", res.url);
      }
    }
    setIsUploading(false);
  };

  const onDelete = async (id: string) => {
    setIsLoading(true);
    await deleteNews(id)
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
        }

        if (res.success) {
          toast.success(res.success);
          action.onClose();
          router.refresh();
        }
      })
      .finally(() => setIsUploading(false));
  };

  return (
    <Card>
      {isPreview && (
        <CardHeader className="flex flex-col items-start p-6 space-y-4">
          {!initialData?.isPublished && (
            <Banner
              variant={"warning"}
              label="Tin tức này hiện đang tạm ẩn và sẽ không được xuất hiện ở bất kỳ đâu"
            />
          )}
          <div className="flex items-center gap-2">
            <label className="block text-foreground font-bold text-base">
              Trạng thái:
            </label>
            <Chip
              className="capitalize"
              color={statusColorMap[initialData!.isPublished.toString()]}
              size="md"
              variant="flat"
              classNames={{
                content: "uppercase",
              }}
            >
              {
                statusLabelMap[
                  initialData!.isPublished.toString() as keyof typeof statusLabelMap
                ]
              }
            </Chip>
          </div>
        </CardHeader>
      )}
      <Divider />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardBody className="p-6 flex flex-col gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      classNames={{
                        label: "font-bold text-base",
                      }}
                      isDisabled={isLoading}
                      label="Tiêu đề"
                      labelPlacement="outside"
                      placeholder="Nhập tiêu đề tin tức"
                      onValueChange={field.onChange}
                      errorMessage={fieldState.error?.message}
                      isInvalid={fieldState.invalid}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {form.getValues("cover") !== "" ? (
              <FormField
                control={form.control}
                name="cover"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        classNames={{
                          label: "font-bold text-base",
                        }}
                        isReadOnly
                        isDisabled={isLoading}
                        label="Ảnh đại diện"
                        labelPlacement="outside"
                        value={field.value}
                        endContent={
                          isPreview && (
                            <X
                              className="text-rose-500 hover:bg-rose-500/30 rounded-full size-6 cursor-pointer hover:scale-110 hover:shadow-2xl"
                              onClick={() => {
                                form.setValue("cover", "");
                                setFile(undefined);
                              }}
                            />
                          )
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : (
              <>
                <div className="flex items-center gap-4">
                  <label className="block text-foreground font-bold text-base">
                    Ảnh đại diện
                  </label>
                  {file && (
                    <Button
                      isLoading={isUploading}
                      isDisabled={isLoading}
                      onClick={onUpload}
                      className="shadow"
                      color="primary"
                    >
                      Đăng tải hình ảnh
                    </Button>
                  )}
                </div>
                <SingleImageDropzone
                  className="w-full outline-none"
                  disabled={isUploading}
                  value={file}
                  onSelect={(file) => onSelect(file)}
                />
                {form.control._formState.errors.cover?.message && (
                  <p className="text-rose-500 text-xs font-medium">
                    *Vui lòng chọn ảnh đại diện
                  </p>
                )}
              </>
            )}
            <FormField
              control={form.control}
              name="type"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      classNames={{
                        label: "font-bold text-base",
                        mainWrapper: "w-[250px]",
                      }}
                      disallowEmptySelection
                      items={[
                        {
                          key: "ANNOUNCEMENT",
                          label: "ANNOUNCEMENT",
                          value: NewsType.ANNOUNCEMENT,
                        },
                        {
                          key: "EVENT",
                          label: "EVENT",
                          value: NewsType.EVENT,
                        },
                        {
                          key: "BLOG",
                          label: "BLOG",
                          value: NewsType.BLOG,
                        },
                      ]}
                      selectedKeys={[field.value]}
                      onSelectionChange={field.onChange}
                      isDisabled={isLoading}
                      label="Loại tin tức"
                      labelPlacement="outside"
                      placeholder="Chọn loại tin tức"
                      errorMessage={fieldState.error?.message}
                      isInvalid={fieldState.invalid}
                      renderValue={(items) => {
                        return items.map((item) => (
                          <Chip
                            key={item.key}
                            className="capitalize"
                            color={typeColorMap[String(item.key)]} // Convert item.key to a string
                            size="sm"
                            radius="sm"
                            variant="flat"
                            classNames={{
                              base: "max-w-full w-full",
                            }}
                          >
                            {String(item.key)}
                          </Chip>
                        ));
                      }}
                      {...field}
                    >
                      {newsType.map((news) => (
                        <SelectItem key={news.key}>
                          <Chip
                            className="capitalize"
                            color={typeColorMap[news.key]}
                            size="sm"
                            variant="flat"
                          >
                            {news.label}
                          </Chip>
                        </SelectItem>
                      ))}
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="schoolId"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Autocomplete
                      inputProps={{
                        label: (
                          <label className="block text-foreground font-bold text-base">
                            Chọn trường học (Tùy chọn)
                          </label>
                        ),
                      }}
                      classNames={{
                        base: "w-[250px]",
                      }}
                      items={schools}
                      selectedKey={field.value}
                      onSelectionChange={(select) => {
                        if (select == null) return field.onChange(undefined);
                        field.onChange(select);
                      }}
                      isDisabled={isLoading}
                      description={
                        <p className="text-muted-foreground italic">
                          Bỏ qua nếu đây là tin tức chung, không liên quan đến
                          các trường học
                        </p>
                      }
                      label="Chọn trường học (Tùy chọn)"
                      labelPlacement="outside"
                      placeholder="Chọn trường học"
                      errorMessage={fieldState.error?.message}
                      isInvalid={fieldState.invalid}
                    >
                      {schools.map((school) => (
                        <AutocompleteItem
                          key={school.id}
                          startContent={
                            <Image
                              width={30}
                              src={
                                schools.filter(
                                  (item) => item.name === school.name
                                )[0].logo
                              }
                              alt="Logo"
                            />
                          }
                        >
                          {school.name}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <label className="block text-foreground font-bold text-base">
                    Nội dung
                  </label>
                  <FormControl>
                    <QuillEditor
                      value={field.value}
                      preview={isLoading}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  {form.control._formState.errors.content?.message && (
                    <p className="text-rose-500 text-xs font-medium">
                      Vui lòng nhập nội dung
                    </p>
                  )}
                </FormItem>
              )}
            />
          </CardBody>
          <CardFooter className="gap-4 justify-end">
            {/* On Delete */}
            {isPreview && (
              <Button
                onPress={() =>
                  action.onOpen(
                    () => onDelete(initialData!.id),
                    "Bạn có chắc chắn muốn xóa tin tức này?",
                    "Hành động đã thực hiện sẽ không thể hủy bỏ"
                  )
                }
                isLoading={isLoading}
                isDisabled={isLoading}
                type="button"
                variant="shadow"
                color="danger"
              >
                Xóa tin tức
              </Button>
            )}
            {/* On Save */}
            <Button
              onPress={() => {
                const allValues = form.getValues();
                onSave(allValues);
              }}
              isLoading={isLoading}
              isDisabled={isLoading}
              type="button"
              variant="shadow"
              color="danger"
            >
              Lưu ở chế độ tạm ẩn
            </Button>
            {/* On Publish */}
            <Button
              isLoading={isLoading}
              isDisabled={isLoading}
              type="submit"
              variant="shadow"
              color="success"
            >
              Đăng tải
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
