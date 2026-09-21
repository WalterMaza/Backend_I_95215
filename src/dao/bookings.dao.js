// DAO: conserva la lectura y escritura de JSON de la clase anterior.
// Recibe datos preparados; no conoce Express ni decide reglas del negocio.
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Configuración automática de la ruta absoluta de datos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_PATH = path.join(__dirname, '../data/bookings.json');

// Función interna o exportada para leer el archivo
export async function getAll() {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Si el archivo no existe (error ENOENT), devuelve un array vacío para no romper la app
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

// Busca una reserva por ID.
export async function getById(id) {
  const bookings = await getAll();

  return bookings.find(booking => booking.id === id) ?? null;
}

// Agrega una nueva reserva.
export async function create(bookingData) {
  const bookings = await getAll();

  // El service ya generó el ID; el DAO lo guarda.
  const newBooking = {
    id: bookingData.id,
    service: bookingData.service,
    quantity: bookingData.quantity
  };

  bookings.push(newBooking);

  await fs.writeFile(
    FILE_PATH,
    JSON.stringify(bookings, null, 2)
  );

  return newBooking;
}

// Actualiza una reserva existente.
export async function update(id, changes) {
  const bookings = await getAll();

  const bookingIndex = bookings.findIndex(
    booking => booking.id === id
  );

  if (bookingIndex === -1) {
    return null;
  }

  bookings[bookingIndex] = {
    ...bookings[bookingIndex],
    ...changes
  };

  await fs.writeFile(
    FILE_PATH,
    JSON.stringify(bookings, null, 2)
  );

  return bookings[bookingIndex];
}

// Elimina una reserva.
export async function remove(id) {
  const bookings = await getAll();

  const filteredBookings = bookings.filter(
    booking => booking.id !== id
  );

  if (filteredBookings.length === bookings.length) {
    return false;
  }

  await fs.writeFile(
    FILE_PATH,
    JSON.stringify(filteredBookings, null, 2)
  );

  return true;
}

