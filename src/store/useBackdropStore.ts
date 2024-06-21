import  {create} from 'zustand'


type BackdropStore = {
  backdrop : boolean
    showBackdrop: () => void
    hideBackdrop: () => void
  }

const useBackdropStore = create<BackdropStore>()((set) => ({
    backdrop: false,
    showBackdrop: () => set(() => ({ backdrop: true })),
    hideBackdrop: () => set(() => ({ backdrop: false })),
  }))

 




export default useBackdropStore;