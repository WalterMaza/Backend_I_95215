// config/env.config.js
// PASO 1: Configuración de variables de entorno
// Este archivo carga las variables de entorno desde el archivo .env
// y las exporta como un objeto centralizado para usar en toda la aplicación.

import dotenv from "dotenv"
dotenv.config()

// PASO 2: Exportar configuración centralizada
// process.env permite leer variables de entorno definidas en el archivo .env
// Si PORT no está definido, usamos 8080 como valor por defecto
export const envConfig = {
    port: Number(process.env.PORT) || 8080,
    // MONGODB_URI es la cadena de conexión a MongoDB
    // Debe estar definida en el archivo .env
    mongoUri: process.env.MONGODB_URI
}


