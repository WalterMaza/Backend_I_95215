// Este archivo es el punto de entrada de la aplicación
// Se encarga de conectar nuestra aplicación a MongoDB y luego iniciar el servidor HTTP.

import app from "./app.js"
import { connectDB } from "./config/database.config.js"
import { envConfig } from "./config/env.config.js"

const startServer = async () => {

    await connectDB()

    app.listen(envConfig.port, () => {
      console.log(`Servidor disponible en http://localhost:${envConfig.port}`)
    })

}

// PASO 5: Ejecutar la función para iniciar el servidor
startServer()


