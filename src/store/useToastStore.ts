import {create} from 'zustand'
interface Toast{
    id :string;
    message : string;
    type: 'success' | 'error' | 'info';
}


interface ToastStore {
    toasts : Toast[],
    addToast : (message: string, type: 'success' | 'error' | 'info')=> void
    removeToast: (id: string) => void

}

const useToastStore = create<ToastStore>((set)=>({
    toasts : [],
   
    addToast: (message, type ) => {
        const id = Math.random().toString(36).slice(2, 4);
        set((state) => ( { toasts: [...state.toasts,{id , message, type }], }))},
    removeToast : (id)=>{
        set((state)=>({
            toasts: state.toasts.filter((toast)=> toast.id !== id)
        }))
    }

}))


export {useToastStore}