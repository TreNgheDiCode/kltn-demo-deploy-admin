import { StudentLib } from "@/types/type";
import { create } from "zustand";

type UpdateAccountStore = {
  data: StudentLib;
  isOpen: boolean;
  onOpen: (data: StudentLib) => void;
  onClose: () => void;
};

export const useUpdateAccount = create<UpdateAccountStore>((set) => ({
  data: null,
  isOpen: false,
  onOpen: (data: StudentLib) => set({ isOpen: true, data }),
  onClose: () =>
    set({
      isOpen: false,
      data: null,
    }),
}));
