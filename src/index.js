import "dotenv/config"; // carrega variáveis do .env

import { fetchCinemaAPI, getAllMovies } from "./services/fetchCinemaAPI.js";
import { getMainActorData } from "./services/findActor.js";

async function main() {
  try {
    console.log("🔄 Buscando dados da API...");
    const allMovies = await getAllMovies();
    console.log("✅ Processo finalizado com sucesso!");
    await getMainActorData(allMovies[0].results[1].id);
  } catch (error) {
    console.error("❌ Erro durante execução:", error.message);
  }
}

main();
