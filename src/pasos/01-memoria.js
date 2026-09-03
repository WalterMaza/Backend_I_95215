// Este es el mismo punto de partida de la clase anterior:
// los servicios están guardados en un array dentro de la aplicación.
const services = [
  {
    id: 1,
    name: "Consulta médica general",
    duration: 30,
    price: 12000,
    category: "salud",
    available: true
  }
]

// Agregamos un servicio solamente al array que vive en memoria.
services.push({
  id: 2,
  name: "Sesión de fisioterapia",
  duration: 45,
  price: 15000,
  category: "rehabilitación",
  available: true
})

console.table(services)

// Cuando este proceso termina, el array desaparece.
// Al ejecutar nuevamente el archivo, JavaScript vuelve a construirlo desde cero.
console.log("Ejecutá nuevamente el archivo: los datos no se conservaron fuera del código.")
