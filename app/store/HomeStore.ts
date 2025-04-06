import { create } from "zustand";

interface Character {
  id: number;
  name: string;
  description: string;
  creator: string;
  messages: number;
  image_url: string;
  tags: string[];
  upvotes: number;
  downvotes: number;
}

interface GetCharactersResponse {
  characters: Character[];
  total: number;
}

interface StoreState {
  search: string;
  currentPage: number;
  characters: Character[];
  total: number;
  loading: boolean;
  bgImage: string | null;
  setSearch: (search: string) => void;
  setCurrentPage: (page: number) => void;
  setCharacters: (characters: Character[]) => void;
  setTotal: (total: number) => void;
  setLoading: (loading: boolean) => void;
  setBgImage: (imageUrl: string | null) => void;
}

export const useHomeStore = create<StoreState>((set) => ({
  search: "",
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
    set({ bgImage: imageUrl });
    if (imageUrl) {
      localStorage.setItem('bgImage', imageUrl);
    } else {
      localStorage.removeItem('bgImage');
    }
  }
}));
