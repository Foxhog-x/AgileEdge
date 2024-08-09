import { create } from "zustand";

type useEventDialogStore = {
  eventDialog: boolean;
  showDialog: () => void;
  hideDialog: () => void;
};

const useEventDialogStore = create<useEventDialogStore>((set) => ({
  eventDialog: false,
  showDialog: () => set(() => ({ eventDialog: true })),
  hideDialog: () => set(() => ({ eventDialog: false })),
}));

export default useEventDialogStore;
