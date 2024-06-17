import { create } from "zustand";

type CreateScholarshipStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useCreateScholarship = create<CreateScholarshipStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () =>
    set({
      isOpen: false,
    }),
}));
