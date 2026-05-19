import { useQuery } from "react-query";

const BASE_URL = "https://api.themoviedb.org/3";
const AUTH = import.meta.env.VITE_AUTH;

/**
 * Base utility to execute fetch requests to TMDB REST API endpoints.
 * Centralizes authentication, response checking, and JSON parsing.
 * 
 * @param {string} endpoint - The relative endpoint path (e.g. "movie/popular").
 * @param {string} errorMessage - Desired error message to throw on failure.
 * @returns {Promise<any>} Parsed response data from the API.
 */
const tmdbFetch = async (endpoint, errorMessage = "Failed to fetch data") => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${AUTH}`,
    },
  });

  if (!response.ok) {
    throw new Error(errorMessage);
  }
  return response.json();
};

/**
 * Hook to retrieve trending movies, TV shows, and people for the day.
 * 
 * @returns {object} React Query result wrapper containing loading state and results.
 */
export const UseAPITrendingAll = () => {
  return useQuery({
    queryKey: ["trendingAll"],
    queryFn: () => tmdbFetch("trending/all/day?language=en-US", "Failed to fetch trending list"),
  });
};

/**
 * Hook to retrieve trending movies filtered by daily or weekly criteria.
 * 
 * @param {string} time - Time window ("day" or "week").
 * @returns {object} React Query result wrapper.
 */
export const UseAPITrendingMovies = (time) => {
  return useQuery({
    queryKey: ["trendingMovie", time],
    queryFn: () => tmdbFetch(`trending/movie/${time}?language=en-US`, "Failed to fetch trending movies"),
  });
};

/**
 * Hook to retrieve trending TV shows filtered by daily or weekly criteria.
 * 
 * @param {string} time - Time window ("day" or "week").
 * @returns {object} React Query result wrapper.
 */
export const UseAPITrendingTv = (time) => {
  return useQuery({
    queryKey: ["trendingTv", time],
    queryFn: () => tmdbFetch(`trending/tv/${time}?language=en-US`, "Failed to fetch trending TV shows"),
  });
};

/**
 * Hook to fetch popular movies, TV shows, or people list.
 * 
 * @param {string} schema - Endpoint resource schema ("movie", "tv", or "person").
 * @returns {object} React Query result wrapper.
 */
export const UseAPIPopular = (schema) => {
  return useQuery({
    queryKey: ["popularType", schema],
    queryFn: () => tmdbFetch(`${schema}/popular?language=en-US&page=1&region=id-ID`, "Failed to fetch popular items"),
  });
};

/**
 * Hook to fetch detailed metadata for a specific Movie, TV show, or Person.
 * 
 * @param {string} schema - Endpoint resource schema ("movie", "tv", or "person").
 * @param {string|number} id - TMDB unique ID.
 * @returns {object} React Query result wrapper.
 */
export const UseAPIById = (schema, id) => {
  return useQuery({
    queryKey: ["details", schema, id],
    queryFn: () => tmdbFetch(`${schema}/${id}?language=en-US`, "Details not found"),
  });
};

/**
 * Hook to retrieve casting and crew credits for a specific movie or TV show.
 * 
 * @param {string} schema - Endpoint resource schema ("movie" or "tv").
 * @param {string|number} id - TMDB unique show ID.
 * @returns {object} React Query result wrapper.
 */
export const UseAPICharById = (schema, id) => {
  return useQuery({
    queryKey: ["char", schema, id],
    queryFn: () => tmdbFetch(`${schema}/${id}/credits?language=en-US`, "Credits not found"),
  });
};

/**
 * Hook to retrieve external social media links (Instagram, Twitter, Facebook, etc.) for a profile/show.
 * 
 * @param {string} schema - Endpoint resource schema (typically "person", "movie", or "tv").
 * @param {string|number} id - TMDB unique ID.
 * @returns {object} React Query result wrapper.
 */
export const UseAPISosmedById = (schema, id) => {
  return useQuery({
    queryKey: ["sosmed", schema, id],
    queryFn: () => tmdbFetch(`${schema}/${id}/external_ids`, "Social links not found"),
  });
};

/**
 * Hook to fetch recommendations list based on a specific movie or TV show.
 * 
 * @param {string} schema - Endpoint resource schema ("movie" or "tv").
 * @param {string|number} id - TMDB unique show ID.
 * @returns {object} React Query result wrapper.
 */
export const UseAPIRecomendationById = (schema, id) => {
  return useQuery({
    queryKey: ["recomendation", schema, id],
    queryFn: () => tmdbFetch(`${schema}/${id}/recommendations?language=en-US&page=1`, "Recommendations not found"),
  });
};

/**
 * Hook to fetch list of descriptive keywords assigned to a movie or TV show.
 * 
 * @param {string} schema - Endpoint resource schema ("movie" or "tv").
 * @param {string|number} id - TMDB unique show ID.
 * @returns {object} React Query result wrapper.
 */
export const UseAPIKeywordById = (schema, id) => {
  return useQuery({
    queryKey: ["keyword", schema, id],
    queryFn: () => tmdbFetch(`${schema}/${id}/keywords`, "Keywords not found"),
  });
};

/**
 * Hook to fetch historical movie or TV credits belonging to a single person.
 * 
 * @param {string} schemaHistory - History schema ("movie_credits" or "tv_credits").
 * @param {string|number} id - TMDB unique person ID.
 * @returns {object} React Query result wrapper.
 */
export const UseAPICreditPerson = (schemaHistory, id) => {
  return useQuery({
    queryKey: ["creditPerson", schemaHistory, id],
    queryFn: () => tmdbFetch(`person/${id}/${schemaHistory}?language=en-US`, "Person credits not found"),
  });
};

/**
 * Hook to retrieve YouTube video keys/clips associated with a movie or TV show.
 * 
 * @param {string} schema - Endpoint resource schema ("movie" or "tv").
 * @param {string|number} id - TMDB unique show ID.
 * @returns {object} React Query result wrapper.
 */
export const UseAPIVideo = (schema, id) => {
  return useQuery({
    queryKey: ["video", schema, id],
    queryFn: () => tmdbFetch(`${schema}/${id}/videos?language=en-US`, "Videos not found"),
  });
};

/**
 * Hook to search TMDB movies catalog matching a text query string.
 * Enabled only if a non-empty search query is provided.
 * 
 * @param {string} query - Movie name query string.
 * @returns {object} React Query result wrapper.
 */
export const UseAPISearch = (query) => {
  return useQuery({
    queryKey: ["searchMovie", query],
    queryFn: () => tmdbFetch(`search/movie?query=${query}&include_adult=false&language=en-US&page=1`, "Search failed"),
    enabled: !!query,
  });
};

/**
 * Hook to search TMDB TV series catalog matching a text query string.
 * Enabled only if a non-empty search query is provided.
 * 
 * @param {string} query - TV series query string.
 * @returns {object} React Query result wrapper.
 */
export const UseAPISearchTv = (query) => {
  return useQuery({
    queryKey: ["searchTv", query],
    queryFn: () => tmdbFetch(`search/tv?query=${query}&include_adult=false&language=en-US&page=1`, "Search failed"),
    enabled: !!query,
  });
};
