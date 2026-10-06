// Este archivo maneja las operaciones de acceso a datos para la colección de servicios.
// Usa Mongoose para interactuar con MongoDB.

import Service from "../models/services.models.js";

// Obtener todos los servicios con paginación, filtros y ordenamiento
// Esta función implementa consultas avanzadas usando mongoose-paginate-v2
export async function getAll(filters = {}, options = {}) {
  try {
    // Construir filtros dinámicamente según los parámetros recibidos
    // filters = { category: "salud", available: "true" }
    const query = {};
    
    if (filters.category) {
      query.category = filters.category;
    }
    
    if (filters.available !== undefined) {
      // Convierte string "true"/"false" a boolean para MongoDB
      query.available = filters.available === 'true' || filters.available === true;
    }
    
    // Configurar opciones de paginación y ordenamiento
    // options = { page: 1, limit: 10, sort: "asc" }
    const paginateOptions = {
      page: parseInt(options.page) || 1, // Página actual (default: 1)
      limit: parseInt(options.limit) || 10, // Resultados por página (default: 10)
      sort: {}
    };
    
    // Configurar ordenamiento por precio
    // sort: "asc" -> 1 (ascendente), sort: "desc" -> -1 (descendente)
    if (options.sort) {
      const sortOrder = options.sort === 'desc' ? -1 : 1;
      paginateOptions.sort.price = sortOrder;
    }
    
    // Usar paginate() del plugin mongoose-paginate-v2
    // Este plugin agrega el método paginate() al modelo Service
    // Retorna un objeto con metadata de paginación y los documentos
    const result = await Service.paginate(query, paginateOptions);
    
    // Retornar objeto completo con metadata para el frontend
    return {
      docs: result.docs, // Array de servicios de la página actual
      totalDocs: result.totalDocs, // Total de documentos que coinciden con el filtro
      limit: result.limit, // Límite de documentos por página
      totalPages: result.totalPages, // Total de páginas disponibles
      page: result.page, // Página actual
      pagingCounter: result.pagingCounter, // Contador para paginación
      hasPrevPage: result.hasPrevPage, // Indica si existe página anterior
      hasNextPage: result.hasNextPage, // Indica si existe página siguiente
      prevPage: result.prevPage, // Número de página anterior
      nextPage: result.nextPage // Número de página siguiente
    };
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