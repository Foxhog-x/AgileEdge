import { create } from "zustand";

type manageIds={
    boardId: string
    cardId: string
    sourceColumnId: string,
    destinationColumnId:string
    sourceCardId:string,
    destinationCardId:string,
    saveBoardId: (id:string) => void
    saveCardId: (id:string) => void
    saveSourceColumnId:(id:string)=>void
    saveDestinationColumnId:(id:string)=>void
    saveSourceCardId:(id:string)=>void
    saveDestinationCardId:(id:string)=>void
    removeBoardId: (id:string)=>void
}

const useManageIdStore = create<manageIds>((set)=> ({
    boardId: "",
    cardId: "",
    sourceColumnId: "",
    destinationColumnId:"",
    sourceCardId:"",
    destinationCardId:"",
    saveBoardId: (id )=> set(() => ({boardId: id })),
    saveCardId:(id )=> set(() => ({cardId: id })),
    saveSourceColumnId:(id )=> set(() => ({sourceColumnId: id })),
    saveDestinationColumnId:(id )=> set(() => ({destinationColumnId: id })),
    saveSourceCardId:(id )=> set(() => ({sourceCardId: id })),
    saveDestinationCardId:(id )=> set(() => ({destinationCardId: id })),
    removeBoardId: ()=> set(()=> ({boardId:""}))
}))

export {useManageIdStore}