import { create } from 'zustand'
import { persist, PersistStorage, StorageValue } from 'zustand/middleware'

interface CharacterState {
  persona: string
  is_public: boolean
  is_nsfw: boolean
  name: string
  model_instructions: string
  scenario: string
  description: string
  first_message: string
  tags: string
  gender: string
  textareaTokens: { [key: string]: number }
  TokenTotal: number
  setCharacterData: (data: Partial<CharacterState>) => void
}

const customStorage: PersistStorage<CharacterState> = {
  getItem: (name) => {
    const item = localStorage.getItem(name)
    return item ? JSON.parse(item) as StorageValue<CharacterState> : null
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value))
  },
  removeItem: (name) => {
    localStorage.removeItem(name)
  }
}

export const useCharacterStore = create<CharacterState>()(
  persist(
    (set) => ({
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
        const newTextareaTokens = data.textareaTokens || state.textareaTokens
        const newTokenTotal = Object.values(newTextareaTokens).reduce((a, b) => a + b, 0)

        return {
          ...state,
          ...data,
          textareaTokens: newTextareaTokens,
          TokenTotal: newTokenTotal
        }
      })
    }),
    {
      name: 'character-store',
      storage: customStorage,
      version: 1
    }
  )
)
