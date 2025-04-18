import { writeFile } from "fs/promises";

export async function saveDocToDatabase(dataToSave) {
  const dataToSaveJson = JSON.stringify(dataToSave, null, 2);
  try {
    await writeFile("./data/filmes.json", dataToSaveJson);
    console.log("💚 Arquivo salvo com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao salvar o arquivo:", err);
  }
}
