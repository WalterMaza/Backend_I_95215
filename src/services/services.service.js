// Service: prepara los datos y concentra las decisiones del sistema.
// No usa req/res ni lee archivos. Conservamos las operaciones de clase 4.
import { randomUUID } from "crypto"
import * as repository from "../repositories/services.repository.js"

export async function getServices() {
  return repository.getAll()
}

export async function getServiceById(id) {
  return repository.getById(id)
}

export async function addService(data) {
  // El cliente no elige el ID: lo genera el servidor.
  const newData = { ...data, id: randomUUID() }
  return repository.create(newData)
}

export async function updateService(id, changes) {
  // El ID identifica al recurso y no se puede cambiar.
  const { id: ignoredId, ...allowedChanges } = changes
  return repository.update(id, allowedChanges)
}

export async function deleteService(id) {
  return repository.remove(id)
}
