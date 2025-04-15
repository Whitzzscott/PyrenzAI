import { create } from "zustand";

interface ChatStore {
  isClient: boolean;
  setIsClient: (status: boolean) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  isClient: false,
  setIsClient: (status) => set({ isClient: status }),
}));

export const chatStoreMiddleware =
  (config: any) => (set: any, get: any, api: any) => {
    return config(
      (args: any) => {
        set(args);
      },
      get,
      api,
    );
  };
