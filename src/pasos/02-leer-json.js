import { promises as fs } from "node:fs"

// La ruta se interpreta desde la carpeta donde ejecutamos Node.js.
// Para esta clase siempre iniciaremos el proyecto desde su carpeta raíz.
const path = "./src/data/services.json"

async function main() {
  // readFile es asíncrono: usamos await para esperar el resultado.
  // utf-8 hace que recibamos el contenido como texto y no como un Buffer.
  const content = await fs.readFile(path, "utf-8")

  console.log("Tipo antes de parsear:", typeof content)
  console.log("Texto leído:", content)

  // Un archivo JSON contiene texto.
  // JSON.parse transforma ese texto en un array de JavaScript.
  const services = JSON.parse(content)

  console.log("¿Es un array?", Array.isArray(services))
  console.table(services)
}

// Si la promesa de main se rechaza, mostramos el error en la terminal.
main().catch(console.error)
