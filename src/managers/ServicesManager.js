// servicesManager.js
import { promises as fs } from "node:fs"
import { randomUUID } from "node:crypto"

// Lee todos los servicios del archivo.
// Recibe la ruta porque ya no tenemos una instancia que guarde this.path.
export async function getServices(path) {
  const content = await fs.readFile(path, "utf-8")

  return JSON.parse(content)
}

// Busca un servicio por ID.
export async function getServiceById(path, id) {
  const services = await getServices(path)

  return services.find(service => service.id === id) ?? null
}

// Agrega un nuevo servicio.
export async function addService(path, serviceData) {
  const services = await getServices(path)

  // El servidor genera el ID.
  const newService = {
    id: randomUUID(),
    name: serviceData.name,
    duration: serviceData.duration,
    price: serviceData.price,
    category: serviceData.category,
    available: serviceData.available
  }

  services.push(newService)

  await fs.writeFile(
    path,
    JSON.stringify(services, null, 2)
  )

  return newService
}

// Actualiza un servicio existente.
export async function updateService(path, id, changes) {
  const services = await getServices(path)

  const serviceIndex = services.findIndex(
    service => service.id === id
  )

  if (serviceIndex === -1) {
    return null
  }

  // Si el cliente manda un id, lo descartamos.
  const { id: ignoredId, ...allowedChanges } = changes

  services[serviceIndex] = {
    ...services[serviceIndex],
    ...allowedChanges
  }

  await fs.writeFile(
    path,
    JSON.stringify(services, null, 2)
  )

  return services[serviceIndex]
}

// Elimina un servicio.
export async function deleteService(path, id) {
  const services = await getServices(path)

  const filteredServices = services.filter(
    service => service.id !== id
  )

  if (filteredServices.length === services.length) {
    return false
  }

  await fs.writeFile(
    path,
    JSON.stringify(filteredServices, null, 2)
  )

  return true
}