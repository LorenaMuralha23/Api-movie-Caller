import "dotenv/config";
import fetch from "node-fetch";

const MOVIES_LIST = 100;
const RESULTS_PER_PAGES = 20;

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

export async function getAllMovies() {
  const allMovies = [];
  const totalPages = Math.ceil(MOVIES_LIST / RESULTS_PER_PAGES);

  for (let page = 1; page <= totalPages; page++) {
    console.log(`🔍 Buscando filmes na página ${page}...`);
    const movies = await fetchCinemaAPI(page);
    allMovies.push(movies);

    if (allMovies.length >= MOVIES_LIST) {
      break;
    }
  }

  return allMovies;
}
