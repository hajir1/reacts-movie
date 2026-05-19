import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Zustand store to manage and persist the background image url for popular lists.
 * Saved in localStorage under 'imagePopular' key.
 */
export const usePopularImages = create(
  persist(
    (set) => ({
      popularImages: "",
      setPopularImages: (data) => set(() => ({ popularImages: data })),
    }),
    { name: "imagePopular" }
  )
);

/**
 * Zustand store to manage the current selected media type for the popular section.
 * Values: "movie", "tv", or "person". Defaults to "movie".
 */
export const usePopularType = create((set) => ({
  popularType: "movie",
  setPopularType: (data) => set(() => ({ popularType: data })),
}));

/**
 * Zustand store to manage the trending time-window type for Movies.
 * Values: "day" or "week". Defaults to "day".
 */
export const useTrendMovie = create((set) => ({
  valueTrendMovie: "day",
  setValueTrendMovie: (data) => set(() => ({ valueTrendMovie: data })),
}));

/**
 * Zustand store to manage the trending time-window type for TV shows.
 * Values: "day" or "week". Defaults to "day".
 */
export const useTrendTv = create((set) => ({
  valueTrendTv: "day",
  setValueTrendTv: (data) => set(() => ({ valueTrendTv: data })),
}));

/**
 * Zustand store to manage active credits tab/schema on character profiles.
 * Values: "movie_credits" or "tv_credits". Defaults to "movie_credits".
 */
export const useSchemaHistory = create((set) => ({
  schemaHistory: "movie_credits",
  setSchemaHistory: (data) => set(() => ({ schemaHistory: data })),
}));

/**
 * Zustand store to manage global query text inputs for Search.
 */
export const useSearch = create((set) => ({
  search: "",
  setSearch: (data) => set(() => ({ search: data })),
}));
