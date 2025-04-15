import { create } from "zustand";

interface CharacterState {
  persona: string;
  is_public: boolean;
  is_nsfw: boolean;
  name: string;
  model_instructions: string;
  scenario: string;
  description: string;
  first_message: string;
  tags: string;
  gender: string;
  textarea_token: { [key: string]: number };
  token_total: number;
  setCharacterData: (data: Partial<CharacterState>) => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  persona: "",
  is_public: false,
  is_nsfw: false,
  name: "",
  model_instructions: "",
  scenario: "",
  description: "",
  first_message: "",
  tags: "",
  gender: "",
  textarea_token: {
    persona: 0,
    name: 0,
    model_instructions: 0,
    scenario: 0,
    description: 0,
    first_message: 0,
    tags: 0,
  },
  token_total: 0,
  setCharacterData: (data) =>
    set((state) => {
      const newTextareaToken = {
        ...state.textarea_token,
        ...data.textarea_token,
      };
      const newTokenTotal = Object.values(newTextareaToken).reduce(
        (a, b) => a + b,
        0,
      );

      return {
        ...state,
        ...data,
        textarea_token: newTextareaToken,
        token_total: newTokenTotal,
      };
    }),
}));
