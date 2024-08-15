import { create } from "zustand";

type onlineObj = {
  member_id: number;
  member_name: string;
  online_status: string;
};

interface onlineStore {
  onlineUser: onlineObj[];
  addOnline: (onlineObj) => void;
  removeOffline: (id: number) => void;
}

const useOnlineStore = create<onlineStore>((set) => ({
  onlineUser: [],
  addOnline: (onlineObj) => {
    set((state) => ({ onlineUser: [...state.onlineUser, onlineObj] }));
  },
  removeOffline: (id) => {
    set((state) => ({
      onlineUser: state.onlineUser.filter((member) => member.member_id !== id),
    }));
  },
}));

export { useOnlineStore };
