import { create } from 'zustand';

interface CharacterState {
  persona: string;
  is_public: boolean;
  name: string;
  model_instructions: string;
  scenario: string;
  description: string;
  first_message: string;
  tags: string;
  gender: string;
  setCharacterData: (data: Partial<CharacterState>) => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  persona: '',
  is_public: false,
  name: '',
  model_instructions: '',
  scenario: '',
  description: '',
  first_message: '',
  tags: '',
  gender: '',
  setCharacterData: (data) => set((state) => ({ ...state, ...data })),
}));
