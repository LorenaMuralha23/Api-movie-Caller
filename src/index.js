import "dotenv/config"; // carrega variáveis do .env

import { getAllMovies } from "./services/fetchCinemaAPI.js";
import { organizeDataForEachMovie } from "./services/mapCinemaData.js";

async function main() {
  try {
    console.log("🔄 Buscando dados da API...");
    const allMovies = await getAllMovies();
    organizeDataForEachMovie(allMovies);
  } catch (error) {
    console.error("❌ Erro durante execução:", error.message);
  }
}

main();
