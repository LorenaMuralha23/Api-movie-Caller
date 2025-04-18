import "dotenv/config";
import fetch from "node-fetch";

export async function findActors(movieID) {
  console.log("👀 Buscando os atores do filme do id: ", movieID);
  const response = await fetch(
    `${process.env.API_ACTORS_URL}/${movieID}/credits?language=pt-BR`,
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
  return data.cast;
}

export async function findMainActorData(actorId) {
  console.log("👑 Buscando dados do ator principal...");
  const response = await fetch(
    `${process.env.API_ACTORS_DATA_URL}/${actorId}?language=en-US`,
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

export async function getMainActorData(movieID) {
  console.log("id recebido: ", movieID);
  const movieActors = await findActors(movieID);
  const mainActorData = await findMainActorData(movieActors[0].id);
  return mainActorData;
}
