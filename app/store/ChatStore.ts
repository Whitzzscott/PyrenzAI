import { create } from 'zustand';
import { User, Character, Message } from "~/components/types/chatTypes";

interface ChatState {
  user: User | null;
  char: Character | null;
  firstMessage: string | null;
  error: string | null;
  loading: boolean;
  previousMessages: Message[];
  charIcon: string;
  messages: Message[];
  setUser: (user: User) => void;
  setChar: (char: Character) => void;
  setFirstMessage: (message: string | null) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  setPreviousMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void;
  setCharIcon: (icon: string) => void;
  setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  user: null,
  char: null,
  firstMessage: null,
  error: null,
  loading: true,
  previousMessages: [],
  charIcon: "",
  messages: [],

  setUser: (user) => set({ user }),
  setChar: (char) => set({ char }),
  setFirstMessage: (message) => set({ firstMessage: message }),
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ loading }),

  setPreviousMessages: (messages) =>
    set((state) => ({
      previousMessages: typeof messages === "function" ? messages(state.previousMessages) : [...state.previousMessages, ...messages],
    })),

  setCharIcon: (icon) => set({ charIcon: icon }),

  setMessages: (messages) =>
    set((state) => ({
      messages: typeof messages === "function" ? messages(state.messages) : messages,
    })),
}));
