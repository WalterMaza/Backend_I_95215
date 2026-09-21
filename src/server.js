import app from "./app.js"

import { PORT } from "./config/env.config.js"

// app.listen inicia el servidor HTTP y lo deja esperando peticiones.
app.listen(PORT, () => {
  console.log(`Servidor disponible en http://localhost:${PORT}`)
})

