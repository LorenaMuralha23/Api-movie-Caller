import "dotenv/config";
import {
  getMovieCrew,
  findMainActorData,
  getActorsName,
} from "./movie-crew-service.js";
import { getMovieGenre } from "./movie-info-service.js";
import { saveDocToDatabase } from "./file-writer-service.js";

export async function organizeDataForEachMovie(movies) {
  const docToDatabase = [];
  for (let page = 0; page < movies.length; page++) {
    for (let result = 0; result < movies[page].results.length; result++) {
      const movieData = await organizeMovieData(movies[page].results[result]);
      docToDatabase.push(movieData);
    }
  }
  saveDocToDatabase(docToDatabase);
}

async function organizeMovieData(movie) {
  const movieCrew = await getMovieCrew(movie.id);
  const genre = await getMovieGenre(movie.id);
  const movieDirector = movieCrew?.crew[0];
  const mainActorData = await findMainActorData(movieCrew?.cast[0]?.id);
  const movieDataObj = {
    titulo: movie?.original_title,
    ano: movie?.release_date,
    genero: genre,
    diretor: movieDirector?.name,
    nota: movie.vote_average,
    dataLancamento: movie.release_date,
  };
  const mainActorDataObj = {
    nome: mainActorData?.name || "",
    idade: getActorAge(mainActorData.birthday),
    nacionalidade: mainActorData.place_of_birth,
  };
  const otherActorsObj = getActorsName(movieCrew.cast);
  const data = {
    ...movieDataObj,
    atorPrincipal: mainActorDataObj,
    atoresCoadjuvantes: otherActorsObj,
  };
  return data;
}

function getActorAge(birthDate) {
  const anoNascimento = new Date(birthDate).getFullYear();
  const anoAtual = new Date().getFullYear();
  return anoAtual - anoNascimento;
}
