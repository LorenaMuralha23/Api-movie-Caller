import "dotenv/config";
import fetch from "node-fetch";

export async function fetchCinemaAPI(page) {
  const response = await fetch(
    `${process.env.API_BASIC_MOVIES_URL}&page=${page}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function getMovieGenre(movieId) {
  const response = await fetch(
    `${process.env.API_MOVIE_DETAILS}/${movieId}?language=en-US`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    }
  );

  const data = await response.json();
  const genre = data.genres[0]?.name;
  return genre;
}

export async function getAllMovies() {
  const allMovies = [];
  const totalPages = Math.ceil(
    process.env.MOVIES_LIST / process.env.RESULTS_PER_PAGES
  );

  for (let page = 1; page <= totalPages; page++) {
    console.log(`🔍 Buscando filmes na página ${page}...`);
    const movies = await fetchCinemaAPI(page);
    allMovies.push(movies);

    if (allMovies.length >= process.env.MOVIES_LIST) {
      break;
    }
  }

  return allMovies;
}
