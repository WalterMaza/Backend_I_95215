// Este archivo maneja las operaciones de acceso a datos para la colección de servicios.
// Usa Mongoose para interactuar con MongoDB.

import Service from "../models/services.models.js";

// Obtener todos los servicios
export async function getAll() {
  try {
    // find() devuelve todos los documentos de la colección
    // lean() convierte los documentos Mongoose a objetos JavaScript planos
    const services = await Service.find().lean();
    return services;
  } catch (error) {
    console.error('Error al obtener servicios de MongoDB:', error);
    throw error;
  }
}

// Buscar un servicio por ID
// findOne busca un documento, en este caso por _id (identificador único en MongoDB)
export async function getById(id) {
  try {
    const service = await Service.findById(id).lean();
    return service ?? null;
  } catch (error) {
    console.error('Error al buscar servicio por ID en MongoDB:', error);
    throw error;
  }
}

// Crear (guarda en la BD) un nuevo servicio
// create() valida los datos según el esquema (required, etc.)
// y los guarda en la colección 'services' de MongoDB
export async function create(serviceData) {
  try {
    const newService = await Service.create(serviceData);
    return newService.toObject();
  } catch (error) {
    console.error('Error al crear servicio en MongoDB:', error);
    throw error;
  }
}

// Actualizar un servicio existente
// findByIdAndUpdate busca por _id y actualiza el documento
export async function update(id, changes) {
  try {
    const updatedService = await Service.findByIdAndUpdate(id, changes).lean();

    return updatedService ?? null;
  } catch (error) {
    console.error('Error al actualizar servicio en MongoDB:', error);
    throw error;
  }
}

// Eliminar un servicio
// findByIdAndDelete busca por _id y elimina el documento
export async function remove(id) {
  try {
    const deletedService = await Service.findByIdAndDelete(id).lean();
    return deletedService !== null;
  } catch (error) {
    console.error('Error al eliminar servicio de MongoDB:', error);
    throw error;
  }
}