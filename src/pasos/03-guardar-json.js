import { promises as fs } from "node:fs"
import { randomUUID } from "node:crypto"

const path = "./src/data/services.json"

async function main() {
  // 1. Leemos el archivo como texto.
  const content = await fs.readFile(path, "utf-8")

  // 2. Convertimos el texto JSON en un array de JavaScript.
  const services = JSON.parse(content)

  // 3. Creamos el nuevo servicio.
  // randomUUID genera un identificador único sin depender del largo del array.
  const newService = {
    id: randomUUID(),
    name: "Masaje relajante",
    duration: 60,
    price: 18000,
    category: "bienestar",
    available: true
  }

  // El cambio ocurre primero en memoria.
  services.push(newService)

  // 4. Convertimos nuevamente el array en texto JSON.
  // null, 2 agrega indentación para que el archivo resulte legible.
  const updatedContent = JSON.stringify(services, null, 2)

  // 5. Sobrescribimos el archivo con el estado actualizado.
  await fs.writeFile(path, updatedContent)

  console.log("Servicio guardado correctamente:")
  console.table([newService])
}

main().catch(console.error)
