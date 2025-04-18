import "dotenv/config"; // carrega variáveis do .env

import { getAllMovies } from "./services/movie-info-service.js";
import { organizeDataForEachMovie } from "./services/data-mapper-service.js";

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
