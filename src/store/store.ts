import { create } from "zustand";

type UIStore = {
  showForm: boolean;
  toggleForm: () => void;
};

export const useUIStore = create<UIStore>((set) => ({
  showForm: false,
  toggleForm: () => set((state) => ({ showForm: !state.showForm })),
}));
