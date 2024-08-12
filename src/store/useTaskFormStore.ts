import { create } from "zustand";

type taskDialog={
    taskDialog:boolean
    columnId:string
    openTaskDialog: (columnId: string) => void
    closeTaskDialog: ()=> void
}



const useTaskFormStore = create<taskDialog>((set)=> ({
    taskDialog : false,
    columnId: "",
    openTaskDialog: (columnId)=> set(() => ({ taskDialog: true, columnId:columnId})),
    closeTaskDialog: ()=> set(()=> ({taskDialog: false, columnId: ""}))
}))

export {useTaskFormStore}