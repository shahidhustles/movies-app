import { TMDB_CONFIG } from "@/lib/api";

export const getMovieDetail = async (
  movieId: string
): Promise<MovieDetails | undefined> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        headers: TMDB_CONFIG.headers,
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movie details.");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
