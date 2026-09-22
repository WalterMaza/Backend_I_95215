// config/database.config.js
// PASO 1: Configuración de conexión a MongoDB
// Este archivo maneja la conexión a la base de datos MongoDB usando Mongoose.
// Se encarga de establecer la conexión al iniciar la aplicación y manejar errores.

import mongoose from "mongoose"
import { envConfig } from "./env.config.js"

// PASO 2: Función para conectar a MongoDB
// Esta función se llama al iniciar el servidor en server.js
export const connectDB = async () => {
    try {
        // PASO 3: Establecer conexión usando la URI desde las variables de entorno
        // mongoose.connect() devuelve una promesa que se resuelve cuando la conexión está lista
        await mongoose.connect(envConfig.mongoUri)
        console.log("✅ MongoDB connected")
        
        // PASO 4: Manejo de eventos de conexión (opcional pero recomendado)
        mongoose.connection.on('error', (err) => {
            console.error('❌ Error en la conexión a MongoDB:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('⚠️ MongoDB desconectado');
        });
    } catch (error) {
        console.error("❌ MongoDB connection error:", error)
        process.exit(1) // Terminamos el proceso si falla la conexión
    }
}