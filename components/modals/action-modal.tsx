"use client";

import { useModalAction } from "@/hooks/use-modal-action";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

export const ActionModal = () => {
  const { isOpen, onClose, title, description, onAction } = useModalAction();

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-[#7D1F1F] dark:text-primary">
              {title}
            </ModalHeader>
            <ModalBody className="text-primary">{description}</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onAction}>
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
