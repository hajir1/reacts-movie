import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePopularImages = create(
  persist(
    (set, get) => ({
      popularImages: "",
      setPopularImages: (data) => set(() => ({ popularImages: data })),
    }),
    { name: "imagePopular" }
  )
);
export const usePopularType = create((set) => ({
  popularType: "movie",
  setPopularType: (data) => set(() => ({ popularType: data })),
}));
export const useTrendMovie = create((set) => ({
  valueTrendMovie: "day",
  setValueTrendMovie: (data) => set(() => ({ valueTrendMovie: data })),
}));
export const useTrendTv = create((set) => ({
  valueTrendTv: "day",
  setValueTrendTv: (data) => set(() => ({ valueTrendTv: data })),
}));
export const useSchemaHistory = create((set) => ({
  schemaHistory: "movie_credits",
  setSchemaHistory: (data) => set(() => ({ schemaHistory: data })),
}));
export const useSearch = create((set) => ({
  search: "",
  setSearch: (data) => set(() => ({ search: data })),
}));
