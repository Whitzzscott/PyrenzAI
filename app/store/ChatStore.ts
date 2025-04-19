import { create } from "zustand";

interface Message {
  name: string;
  text: string;
  icon: string;
  type: "assistant" | "user";
}

interface UserData {
  user_uuid: string;
  name: string;
  icon: string;
}

interface ChatStore {
  firstMessage: string;
  setFirstMessage: (message: string) => void;
  messages: Message[];
  setMessages: (
    messages: Message[] | ((prev: Message[]) => Message[])
  ) => void;
  userData: UserData | null;
  setUserData: (userData: UserData) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  firstMessage: "",
  setFirstMessage: (message: string) => set({ firstMessage: message }),

  messages: [],
  setMessages: (updater) =>
    set((state) => ({
      messages:
        typeof updater === "function" ? updater(state.messages) : updater,
    })),

  userData: null,
  setUserData: (userData: UserData) => set({ userData }),
}));
