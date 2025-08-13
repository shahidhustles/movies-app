import { TMDB_CONFIG } from "./api";

export const getPopularMovies = async () => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    headers: TMDB_CONFIG.headers,
    method: "GET",
  });

  if (!response.ok) {
    //@ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }

  const data = await response.json();

  return data.results;
};
