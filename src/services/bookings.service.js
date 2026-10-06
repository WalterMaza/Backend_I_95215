// Service: prepara los datos y concentra las decisiones del sistema.
// No usa req/res ni lee archivos.
import * as repository from "../repositories/bookings.repository.js"

export async function getBookings() {
  return repository.getAll()
}

export async function getBookingById(id) {
  return repository.getById(id)
}

export async function addBooking(data) {
  // MongoDB genera el ID automáticamente (_id)
  return repository.create(data)
}

export async function updateBooking(id, changes) {
  // El ID identifica al recurso y no se puede cambiar.
  const { id: ignoredId, ...allowedChanges } = changes
  return repository.update(id, allowedChanges)
}

export async function deleteBooking(id) {
  return repository.remove(id)
}
