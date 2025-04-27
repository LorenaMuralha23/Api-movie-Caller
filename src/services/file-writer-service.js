import { writeFile, readFile } from "fs/promises";

export async function saveDocToDatabase(dataToSave) {
  const filePath = "./data/filmes.json";
  let existingData = [];

  try {
    // Tenta ler o arquivo existente
    const fileContent = await readFile(filePath, "utf-8");

    // Se conseguir ler e for um array válido
    const parsedData = JSON.parse(fileContent);
    if (Array.isArray(parsedData)) {
      existingData = parsedData;
    }
  } catch (err) {
    // Se o arquivo não existir ou estiver vazio/mal formatado, começa com array vazio
    console.warn(
      "⚠️ Arquivo novo ou com erro de leitura, será criado do zero."
    );
  }

  // Adiciona os novos dados ao array existente
  existingData.push(...dataToSave);

  // Salva tudo de volta
  try {
    const finalJson = JSON.stringify(existingData, null, 2);
    await writeFile(filePath, finalJson);
    console.log("💚 Dados salvos com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao salvar o arquivo:", err);
  }
}
