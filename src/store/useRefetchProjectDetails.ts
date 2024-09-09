import { create } from "zustand";

type RefetchProjectDetails = {
    refetchProgress: boolean;
    toggleRefetch: () => void;
  
};

const useRefetchProjectDetails = create<RefetchProjectDetails>()((set) => ({
  refetchProgress: false,
  toggleRefetch: () => set((state) => ({ refetchProgress: !state.refetchProgress })),
 
}));

export default useRefetchProjectDetails;
