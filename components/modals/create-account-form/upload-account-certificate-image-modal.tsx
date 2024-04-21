"use client";

import { useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useEdgeStore } from "@/hooks/edgestore";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useAccountCertificateImage } from "@/hooks/use-account-certificate-image";

export const CertificateImageModal = () => {
  const { onFileChange, isOpen, onClose } = useAccountCertificateImage();
  const [file, setFile] = useState<File>();

  const { edgestore } = useEdgeStore();

  const [isUploading, setIsUploading] = useState(false);

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
        onFileChange(res.url);
        onClose();
      }
    }
    setIsUploading(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          <h2 className="text-center text-lg font-semibold text-primary">
            {" "}
            Hình ảnh chứng chỉ
          </h2>
        </ModalHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isUploading}
          value={file}
          onSelect={(file) => onSelect(file)}
        />
        <ModalFooter>
          <Button
            onClick={onUpload}
            isDisabled={!file ? true : false || isUploading}
            variant="shadow"
            color="primary"
            className="w-full"
          >
            Đăng tải
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
