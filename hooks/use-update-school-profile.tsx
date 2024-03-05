import { create } from "zustand";

interface UpdateSchoolData {
  id: string;
  logo?: string;
  background?: string;
  name?: string;
  short?: string;
  isPublished: boolean;
}

type UpdateSchoolProfile = {
  data: UpdateSchoolData;
  isOpen: boolean;
  onOpen: (data?: UpdateSchoolData) => void;
  onClose: () => void;
};

export const useUpdateSchoolProfile = create<UpdateSchoolProfile>((set) => ({
  data: { isPublished: false, id: "" },
  isOpen: false,
  onOpen: (data = { isPublished: false, id: "" }) =>
    set({ isOpen: true, data }),
  onClose: () =>
    set({
      isOpen: false,
      data: { isPublished: false, id: "" },
    }),
}));
