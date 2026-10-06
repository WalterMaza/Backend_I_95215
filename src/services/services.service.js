// Service: prepara los datos y concentra las decisiones del sistema.
// No usa req/res ni lee archivos.
import * as repository from "../repositories/services.repository.js"

export async function getServices(filters = {}, options = {}) {
  return repository.getAll(filters, options)
}

export async function getServiceById(id) {
  return repository.getById(id)
}

export async function addService(data) {
  
  return repository.create(data)
}

export async function updateService(id, changes) {
 
  return repository.update(id, changes)
}

export async function deleteService(id) {
  return repository.remove(id)
}
