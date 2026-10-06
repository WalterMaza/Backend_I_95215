// Este archivo maneja las operaciones de acceso a datos para la colección de reservas.
// Usa Mongoose para interactuar con MongoDB.

import Booking from "../models/bookings.models.js";

// Obtener todas las reservas
export async function getAll() {
  try {
    // find() devuelve todos los documentos de la colección
    // lean() convierte los documentos Mongoose a objetos JavaScript planos
    const bookings = await Booking.find().lean();
    return bookings;
  } catch (error) {
    console.error('Error al obtener reservas de MongoDB:', error);
    throw error;
  }
}

// Buscar una reserva por ID
// findOne busca un documento, en este caso por _id (identificador único en MongoDB)
export async function getById(id) {
  try {
    // populate() reemplaza los ObjectId referenciados con los documentos completos
    // 'services.service' indica que debe poblar el campo 'service' dentro del array 'services'
    // El modelo Booking tiene: services: [{ service: { type: ObjectId, ref: "Services" }, quantity: Number }]
    // Sin populate: services.service = "507f1f77bcf86cd799439011" (solo el ObjectId)
    // Con populate: services.service = { _id: "...", name: "...", price: ..., ... } (documento completo)
    const booking = await Booking.findById(id).populate('services.service');
    return booking ?? null;
  } catch (error) {
    console.error('Error al buscar reserva por ID en MongoDB:', error);
    throw error;
  }
}

// Crear (guarda en la BD) una nueva reserva
// create() valida los datos según el esquema (required, etc.)
// y los guarda en la colección 'bookings' de MongoDB
export async function create(bookingData) {
  try {
    const newBooking = await Booking.create(bookingData);
    return newBooking.toObject();
  } catch (error) {
    console.error('Error al crear reserva en MongoDB:', error);
    throw error;
  }
}

// Actualizar una reserva existente
// findByIdAndUpdate busca por _id y actualiza el documento
export async function update(id, changes) {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(id, changes).lean();

    return updatedBooking ?? null;
  } catch (error) {
    console.error('Error al actualizar reserva en MongoDB:', error);
    throw error;
  }
}

// Eliminar una reserva
// findByIdAndDelete busca por _id y elimina el documento
export async function remove(id) {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(id).lean();
    return deletedBooking !== null;
  } catch (error) {
    console.error('Error al eliminar reserva de MongoDB:', error);
    throw error;
  }
}

