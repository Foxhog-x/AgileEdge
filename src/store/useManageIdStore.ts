import { create } from "zustand";

type manageIds={
    projectId: string
    cardId: string
    sourceColumnId: string,
    destinationColumnId:string
    sourceCardId:string,
    destinationCardId:string,
    saveProjectId: (id:string) => void
    saveCardId: (id:string) => void
    saveSourceColumnId:(id:string)=>void
    saveDestinationColumnId:(id:string)=>void
    saveSourceCardId:(id:string)=>void
    saveDestinationCardId:(id:string)=>void
   
}

const useManageIdStore = create<manageIds>((set)=> ({
    projectId: "",
    cardId: "",
    sourceColumnId: "",
    destinationColumnId:"",
    sourceCardId:"",
    destinationCardId:"",
    saveProjectId: (id )=> set(() => ({projectId: id })),
    saveCardId:(id )=> set(() => ({cardId: id })),
    saveSourceColumnId:(id )=> set(() => ({sourceColumnId: id })),
    saveDestinationColumnId:(id )=> set(() => ({destinationColumnId: id })),
    saveSourceCardId:(id )=> set(() => ({sourceCardId: id })),
    saveDestinationCardId:(id )=> set(() => ({destinationCardId: id })),
    removeProjectId: ()=> set(()=> ({projectId:""}))
}))

export {useManageIdStore}