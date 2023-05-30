import { create } from 'zustand';

interface CartState {
  query: string;
  setQuery: (query: string) => void;
}

const useSearchPostStore = create<CartState>((set, get) => ({
  query: '',

  setQuery: async (query: string) => set({ query }),
}));

export default useSearchPostStore;
