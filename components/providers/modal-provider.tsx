"use client";

import { useEffect, useState } from "react";
import { ActionModal } from "../modals/action-modal";
import { UpdateSchoolProfileModal } from "../modals/update-school-profile-modal";
import { CreateSchoolModal } from "../modals/create-school-modal";
import { CreateAccountModal } from "../modals/create-account-modal";
import { CertificateImageModal } from "../modals/create-account-form/upload-account-certificate-image-modal";
import { DeclineStudentModal } from "../modals/decline-student-modal";

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
      <CertificateImageModal />
      <DeclineStudentModal />
    </>
  );
};
