import { TMDB_CONFIG } from "../lib/api";

export const getMovie = async ({ query }: { query: string }) => {
  const endpoint = `${
    TMDB_CONFIG.BASE_URL
  }search/movie?query=${encodeURIComponent(query)}`;

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
