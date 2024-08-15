import { create } from "zustand";

type createProject = {
  projectDialog: boolean;
  openProjectDialog: () => void;
  closeProjectDialog: () => void;
};

const useProjectDialog = create<createProject>((set) => ({
  projectDialog: false,
  openProjectDialog: () => set(() => ({ projectDialog: true })),
  closeProjectDialog: () => set(() => ({ projectDialog: false })),
}));

export { useProjectDialog };
