import { promises as fs } from "node:fs"
import { randomUUID } from "node:crypto"

class ServiceManager {
  constructor(path) {
    // Guardamos la ruta para no repetirla en cada método.
    this.path = path
  }

  async getServices() {
    // El manager conoce cómo recuperar los datos del archivo.
    const content = await fs.readFile(this.path, "utf-8")
    return JSON.parse(content)
  }

  async addService(serviceData) {
    // Reutilizamos getServices para comenzar desde el estado persistido.
    const services = await this.getServices()

    const newService = {
      id: randomUUID(),
      ...serviceData
    }

    services.push(newService)

    // Para guardar, primero convertimos el array en texto JSON.
    await fs.writeFile(this.path, JSON.stringify(services, null, 2))

    return newService
  }
}

const manager = new ServiceManager("./src/data/services.json")

const createdService = await manager.addService({
  name: "Consulta nutricional",
  duration: 40,
  price: 14000,
  category: "salud",
  available: true
})

console.log("Servicio creado:")
console.table([createdService])

console.log("Todos los servicios persistidos:")
console.table(await manager.getServices())
