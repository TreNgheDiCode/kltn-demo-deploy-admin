import { create } from "zustand";

type CreateAccountStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useCreateAccount = create<CreateAccountStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () =>
    set({
      isOpen: false,
    }),
}));
