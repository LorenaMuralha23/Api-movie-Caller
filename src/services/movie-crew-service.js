import "dotenv/config";
import fetch from "node-fetch";

export async function getMovieCrew(movieID) {
  const response = await fetch(
    `${process.env.API_ACTORS_URL}/${movieID}/credits?language=en-US`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    }
  );
  if (!response.ok) {
    return;
  }

  const data = await response.json();
  return data;
}

export async function findMainActorData(actorId) {
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
    console.log("ID do ator que deu erro: ", actorId);
  }

  const data = await response.json();
  return data;
}

export function getActorsName(actors) {
  const actorsNames = [];
  for (let i = 1; i < actors.length; i++) {
    actorsNames.push(actors[i].name);
  }
  return actorsNames;
}

export async function getMainActorData(movieID) {
  const movieCrew = await getMovieCrew(movieID);
  const mainActorData = await findMainActorData(movieActors[0].id);
  return mainActorData;
}
