const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

/**
 * Helper to build TMDB image URLs with a fallback for missing files.
 * @param {string} path - The TMDB file path.
 * @param {string} size - The size prefix (e.g. 'w300', 'w500', 'original').
 * @param {string} fallback - The fallback image url.
 * @returns {string} The fully qualified image URL.
 */
export const getTmdbImageUrl = (path, size = "original", fallback = "/movienotfound.webp") => {
  if (!path) return fallback;
  return `${TMDB_IMAGE_BASE_URL}/${size}/${path}`;
};

/**
 * Helper to build profile images URL with a fallback for missing profiles.
 * @param {string} path - The TMDB profile path.
 * @param {string} size - The size prefix.
 * @param {string} fallback - The fallback profile placeholder.
 * @returns {string} The fully qualified profile image URL.
 */
export const getProfileImageUrl = (path, size = "w300", fallback = "/people.jpeg") => {
  if (!path) return fallback;
  return `${TMDB_IMAGE_BASE_URL}/${size}/${path}`;
};
