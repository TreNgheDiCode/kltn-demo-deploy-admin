"use client";

import { CreateSchoolFormValues } from "@/data/form-schema";
import { cn } from "@/lib/utils";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "../../../ui/animated-modal";
import { Input } from "../../../ui/input";
import { Textarea } from "../../../ui/textarea";
import { SchoolColorPicker } from "../color-picker";
import { Label } from "@/components/ui/label";

type Props = {
  school: CreateSchoolFormValues;
};

export const PreviewInformation = ({ school }: Props) => {
  return (
    <Modal>
      <ModalTrigger>
        <div className="shadow-[0_0_0_3px_#7d1f1f] dark:shadow-[0_0_0_3px_#ffffff] px-6 py-2 bg-transparent border border-main dark:border-main-foreground dark:text-main-foreground text-main rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
          Xem thông tin
        </div>
      </ModalTrigger>
      <ModalBody>
        <ModalContent className="max-h-[30rem] overflow-y-scroll space-y-4">
          <h4 className="text-lg md:text-2xl text-main dark:text-main-foreground font-bold text-center mb-8">
            Thông tin trường học
          </h4>
          <LabelInputContainer>
            <Label>Tên trường học</Label>
            <Input readOnly value={school.name} />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label>Quốc gia</Label>
            <Textarea readOnly value={school.short} />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label>Màu chủ đạo</Label>
            <SchoolColorPicker defaultValue={school.color} />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label>Quốc gia</Label>
            <Input readOnly value={school.country} />
          </LabelInputContainer>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
