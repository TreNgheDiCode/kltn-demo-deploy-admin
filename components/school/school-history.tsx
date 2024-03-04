"use client";

import { updateHistory } from "@/actions/school";
import { useModalAction } from "@/hooks/use-modal-action";
import { Button } from "@nextui-org/react";
import { LogOut, Pencil, Save } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface SchoolHistoryProps {
  id: string;
  history: string | null;
}

export const SchoolHistory = ({ id, history }: SchoolHistoryProps) => {
  const router = useRouter();
  const modal = useModalAction();

  const [editable, setEditable] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const onChange = (value: string) => {
    history = value;
  };

  const toggleEdit = (mode: boolean) => {
    setEditable(mode);
  };

  const onSave = async () => {
    setLoading(true);

    if (history) {
      await updateHistory(id, history)
        .then((res) => {
          if (res.success) {
            toast.success(res.success);
            router.refresh();
          }

          if (res.error) {
            toast.error(res.error);
          }
        })
        .finally(() => {
          setLoading(false);
          setEditable(false);
        });
    }
  };

  const onCancel = () => {
    modal.onClose();
    setEditable(false);
  };

  const Editor = dynamic(() => import("./description-editor"), { ssr: false });
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-x-3">
        {!editable && (
          <Button
            onClick={() => toggleEdit(true)}
            color="primary"
            startContent={<Pencil className="size-4" />}
          >
            Chỉnh sửa
          </Button>
        )}
        {editable && (
          <>
            <Button
              isDisabled={isLoading}
              onClick={() =>
                modal.onOpen(
                  onCancel,
                  "Bạn chắc chắn muốn trở về?",
                  "Hành động này sẽ hủy bỏ mọi thay đổi."
                )
              }
              color="primary"
              variant="bordered"
              startContent={<LogOut className="size-4" />}
            >
              Trở về
            </Button>
            <Button
              isLoading={isLoading}
              isDisabled={isLoading}
              onClick={onSave}
              color="primary"
              startContent={<Save className="size-4" />}
            >
              Lưu thay đổi
            </Button>
          </>
        )}
      </div>
      {!history && !editable ? (
        <span className="flex items-center justify-center text-muted-foreground italic">
          Không có thông tin
        </span>
      ) : (
        <Editor
          onChange={(value) => onChange(value)}
          editable={editable}
          initialContent={history ?? ""}
        />
      )}
    </div>
  );
};
