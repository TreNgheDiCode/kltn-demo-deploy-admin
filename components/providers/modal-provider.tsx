"use client";

import { Spinner } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { UpdateSchoolProfileModal } from "../modals/update-school-profile-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="justify-center items-center flex">
        <Spinner title="Loading" color="primary" />
      </div>
    );
  }

  return (
    <>
      <UpdateSchoolProfileModal />
    </>
  );
};
