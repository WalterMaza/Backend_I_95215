import app from "./app.js"

const PORT = 8080

// app.listen inicia el servidor HTTP y lo deja esperando peticiones.
app.listen(PORT, () => {
  console.log(`Servidor disponible en http://localhost:${PORT}`)
})
