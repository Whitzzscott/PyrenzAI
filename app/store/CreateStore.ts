import { create } from 'zustand';

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
  textareaTokens: { [key: string]: number }; 
  TokenTotal: number;
  setCharacterData: (data: Partial<CharacterState>) => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  persona: '',
  is_public: false,
  is_nsfw: false,
  name: '',
  model_instructions: '',
  scenario: '',
  description: '',
  first_message: '',
  tags: '',
  gender: '',
  textareaTokens: {},
  TokenTotal: 0,
  setCharacterData: (data) => set((state) => {
    const newTextareaTokens = data.textareaTokens || state.textareaTokens;
    const newTokenTotal = Object.values(newTextareaTokens).reduce((a, b) => a + b, 0);

    return {
      ...state,
      ...data,
      textareaTokens: newTextareaTokens,
      TokenTotal: newTokenTotal,
    };
  }),
}));
