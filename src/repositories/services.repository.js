// Repository: ofrece acceso a datos y delega en el DAO de FileSystem.
// Cuando cambiemos la persistencia, este import será el punto de conexión.
import * as dao from "../dao/services.dao.js"

export async function getAll() {
  return dao.getAll()
}

export async function getById(id) {
  return dao.getById(id)
}

export async function create(data) {
  return dao.create(data)
}

export async function update(id, data) {
  return dao.update(id, data)
}

export async function remove(id) {
  return dao.remove(id)
}

