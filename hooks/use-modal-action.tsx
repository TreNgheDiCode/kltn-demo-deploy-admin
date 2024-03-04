import { create } from "zustand";

type UpdateSchoolProfile = {
  title: string;
  description?: string;
  isOpen: boolean;
  onOpen: (onAction: () => void, title: string, description?: string) => void;
  onClose: () => void;
  onAction: () => void;
};

export const useModalAction = create<UpdateSchoolProfile>((set) => ({
  isOpen: false,
  title: "",
  description: undefined,
  onOpen: (onAction: () => void, title: string, description?: string) =>
    set({ isOpen: true, title, description, onAction }),
  onClose: () =>
    set({
      isOpen: false,
      title: undefined,
      description: undefined,
    }),
  onAction: () => {},
}));
