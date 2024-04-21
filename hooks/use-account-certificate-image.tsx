import { create } from "zustand";

type AccountCertificateImageStore = {
  url?: string;
  isOpen: boolean;
  onOpen: (onFileChange: (url: string) => void) => void;
  onClose: () => void;
  onFileChange: (url: string) => void;
};

export const useAccountCertificateImage = create<AccountCertificateImageStore>(
  (set) => ({
    url: undefined,
    isOpen: false,
    onFileChange: (url: string) => set({ url }),
    onOpen: (onFileChange: (url: string) => void) =>
      set({ isOpen: true, onFileChange }),
    onClose: () =>
      set({
        isOpen: false,
        url: undefined,
      }),
  })
);
