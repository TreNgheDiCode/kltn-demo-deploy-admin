import { create } from "zustand";

type CreateSchoolProfile = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useCreateSchool = create<CreateSchoolProfile>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () =>
    set({
      isOpen: false,
    }),
}));
