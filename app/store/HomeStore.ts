import { create } from 'zustand'
import { persist, PersistStorage, StorageValue } from 'zustand/middleware'

interface Character {
  id: number
  name: string
  description: string
  creator: string
  messages: number
  image_url: string
  tags: string[]
  upvotes: number
  downvotes: number
}

interface GetCharactersResponse {
  characters: Character[]
  total: number
}

interface StoreState {
  search: string
  currentPage: number
  characters: Character[]
  total: number
  loading: boolean
  bgImage: string | null
  setSearch: (search: string) => void
  setCurrentPage: (page: number) => void
  setCharacters: (characters: Character[]) => void
  setTotal: (total: number) => void
  setLoading: (loading: boolean) => void
  setBgImage: (imageUrl: string | null) => void
}

const customStorage: PersistStorage<StoreState> = {
  getItem: (name) => {
    const item = localStorage.getItem(name)
    return item ? JSON.parse(item) as StorageValue<StoreState> : null
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value))
  },
  removeItem: (name) => {
    localStorage.removeItem(name)
  }
}

export const useHomeStore = create<StoreState>()(
  persist(
    (set) => ({
      search: '',
      currentPage: 1,
      characters: [],
      total: 0,
      loading: true,
      bgImage: null,
      setSearch: (search) => set({ search }),
      setCurrentPage: (page) => set({ currentPage: page }),
      setCharacters: (characters) => set({ characters }),
      setTotal: (total) => set({ total }),
      setLoading: (loading) => set({ loading }),
      setBgImage: (imageUrl) => {
        set({ bgImage: imageUrl })
      },
    }),
    {
      name: 'home-store',
      storage: customStorage,
      version: 1
    }
  )
)
