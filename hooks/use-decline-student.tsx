import { create } from "zustand";

type DeclineStudentStore = {
  id: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useDeclineStudent = create<DeclineStudentStore>((set) => ({
  id: "",
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () =>
    set({
      isOpen: false,
      id: undefined,
    }),
}));
