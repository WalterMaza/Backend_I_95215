import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

// 1. Configuración automática de la ruta absoluta de datos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_PATH = path.join(__dirname, '../data/bookings.json');

// Función interna o exportada para leer el archivo
export async function getBookings() {
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
export async function getBookingById(id) {
  const bookings = await getBookings();

  return bookings.find(booking => booking.id === id) ?? null;
}

// Agrega una nueva reserva.
export async function addBooking(bookingData) {
  const bookings = await getBookings();

  // El servidor genera el ID.
  const newBooking = {
    id: randomUUID(),
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
export async function updateBooking(id, changes) {
  const bookings = await getBookings();

  const bookingIndex = bookings.findIndex(
    booking => booking.id === id
  );

  if (bookingIndex === -1) {
    return null;
  }

  // Si el cliente manda un id, lo descartamos.
  const { id: ignoredId, ...allowedChanges } = changes;

  bookings[bookingIndex] = {
    ...bookings[bookingIndex],
    ...allowedChanges
  };

  await fs.writeFile(
    FILE_PATH,
    JSON.stringify(bookings, null, 2)
  );

  return bookings[bookingIndex];
}

// Elimina una reserva.
export async function deleteBooking(id) {
  const bookings = await getBookings();

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
