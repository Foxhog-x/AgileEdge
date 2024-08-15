import { create } from "zustand";

type taskDialog = {
  taskDialog: boolean;
  columnId: string;
  columnName: string;
  openTaskDialog: (columnId: string, columnName: string) => void;
  closeTaskDialog: () => void;
};

const useTaskFormStore = create<taskDialog>((set) => ({
  taskDialog: false,
  columnId: "",
  columnName: "",
  openTaskDialog: (columnId, columnName) =>
    set(() => ({
      taskDialog: true,
      columnId: columnId,
      columnName: columnName,
    })),
  closeTaskDialog: () => set(() => ({ taskDialog: false, columnId: "" })),
}));

export { useTaskFormStore };
