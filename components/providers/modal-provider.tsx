"use client";

import { useEffect, useState } from "react";
import { ActionModal } from "../modals/action-modal";
import { UpdateSchoolProfileModal } from "../modals/update-school-profile-modal";
import { CreateSchoolModal } from "../modals/create-school-modal";

import { CertificateImageModal } from "../modals/create-account-form/upload-account-certificate-image-modal";
import { DeclineStudentModal } from "../modals/decline-student-modal";
import dynamic from "next/dynamic";

const CreateAccountModal = dynamic(
  () => import("../modals/create-account-modal"),
  { ssr: false }
);
const UpdateAccountModal = dynamic(
  () => import("../modals/update-account-modal"),
  { ssr: false }
);

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <UpdateSchoolProfileModal />
      <ActionModal />
      <CreateSchoolModal />
      <CreateAccountModal />
      <UpdateAccountModal />
      <CertificateImageModal />
      <DeclineStudentModal />
    </>
  );
};
