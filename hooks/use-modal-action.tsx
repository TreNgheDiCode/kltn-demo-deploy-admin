import { create } from "zustand";

type ModalAction = {
  title: string;
  description?: string;
  isOpen: boolean;
  onOpen: (
    onAction: (id?: string) => void,
    title: string,
    description?: string
  ) => void;
  onClose: () => void;
  onAction: () => void;
};

export const useModalAction = create<ModalAction>((set) => ({
  isOpen: false,
  title: "",
  description: undefined,
  onOpen: (
    onAction: (id?: string) => void,
    title: string,
    description?: string
  ) => set({ isOpen: true, title, description, onAction }),
  onClose: () =>
    set({
      isOpen: false,
      title: undefined,
      description: undefined,
    }),
  onAction: () => {},
}));
