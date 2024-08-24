import { create } from "zustand";

type RefetchProgress = {
    refetchProgress: boolean;
    toggleRefetch: () => void;
  
};

const useRefetchProgessStore = create<RefetchProgress>()((set) => ({
  refetchProgress: false,
  toggleRefetch: () => set((state) => ({ refetchProgress: !state.refetchProgress })),
 
}));

export default useRefetchProgessStore;
