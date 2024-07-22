"use client";

import { createSchool } from "@/actions/school";
import { useEdgeStore } from "@/hooks/edgestore";
import { NewSchoolSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Textarea } from "@nextui-org/react";
import { PlusIcon } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PickerExample } from "../color-picker";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  BackgroundFile,
  BackgroundSchoolDropzone,
} from "./background-school-dropzone";
import { LogoFile, LogoSchoolDropzone } from "./logo-school-dropzone";
import { useCreateSchool } from "@/hooks/use-create-school";

type CreateSchoolSchema = z.infer<typeof NewSchoolSchema>;

export const CreateTrigger = () => {
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

  const { onOpen } = useCreateSchool();

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
          return redirect(`/managements/schools`);
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
    <Modal>
      <ModalTrigger>
        <button
          disabled={isLoading}
          onClick={() => {
            onOpen();
          }}
          className="relative inline-flex h-full overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Thêm trường học mới
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            <PlusIcon className="size-5" />
          </div>
        </button>
      </ModalTrigger>
    </Modal>
  );
};
