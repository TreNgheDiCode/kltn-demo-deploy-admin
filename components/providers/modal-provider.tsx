"use client";

import { useEffect, useState } from "react";
import { ActionModal } from "../modals/action-modal";
import { UpdateSchoolProfileModal } from "../modals/update-school-profile-modal";

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
    </>
  );
};
