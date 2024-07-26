"use client";

import { IconPlus } from "@tabler/icons-react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";
import { School } from "@prisma/client";

type Props = {
  school: School;
};

export const InformationForm = ({ school }: Props) => {
  return (
    <Modal>
      <ModalTrigger>
        <div className="shadow-[0_0_0_3px_#7d1f1f] dark:shadow-[0_0_0_3px_#ffffff] px-6 py-2 bg-transparent border border-main dark:border-main-foreground dark:text-main-foreground text-main rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
          Xem thông tin
        </div>
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <div></div>
        </ModalContent>
        <ModalFooter className="gap-4">
          <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
            Quay về
          </button>
          <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
            Chỉnh sửa
          </button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};
