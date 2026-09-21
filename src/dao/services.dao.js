// DAO: conserva la lectura y escritura de JSON de la clase anterior.
// Recibe datos preparados; no conoce Express ni decide reglas del negocio.
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Configuración automática de la ruta absoluta de datos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ajusta el '../' si la carpeta 'data' está en otro nivel respecto a este archivo
const FILE_PATH = path.join(__dirname, '../data/services.json'); 

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

// Busca un servicio por ID.
export async function getById(id) {
  const services = await getAll();

  return services.find(service => service.id === id) ?? null;
}

// Agrega un nuevo servicio.
export async function create(serviceData) {
  const services = await getAll();

  // El service ya generó el ID; el DAO lo guarda.
  const newService = {
    id: serviceData.id,
    name: serviceData.name,
    duration: serviceData.duration,
    price: serviceData.price,
    category: serviceData.category,
    available: serviceData.available
  };

  services.push(newService);

  await fs.writeFile(
    FILE_PATH,
    JSON.stringify(services, null, 2)
  );

  return newService;
}

// Actualiza un servicio existente.
export async function update(id, changes) {
  const services = await getAll();

  const serviceIndex = services.findIndex(
    service => service.id === id
  );

  if (serviceIndex === -1) {
    return null;
  }

  services[serviceIndex] = {
    ...services[serviceIndex],
    ...changes
  };

  await fs.writeFile(
    FILE_PATH,
    JSON.stringify(services, null, 2)
  );

  return services[serviceIndex];
}

// Elimina un servicio.
export async function remove(id) {
  const services = await getAll();

  const filteredServices = services.filter(
    service => service.id !== id
  );

  if (filteredServices.length === services.length) {
    return false;
  }

  await fs.writeFile(
    FILE_PATH,
    JSON.stringify(filteredServices, null, 2)
  );

  return true;
}
