import { z } from "zod"

// Esquema de validación para crear un servicio usando Zod
// Zod es una librería de validación de esquemas de TypeScript-first
// Define la estructura y tipos de datos que debe tener el body de la request
export const createServiceSchema = z.object({
    name: z.string().trim().min(1), // String no vacío después de trim()
    description: z.string().trim().min(1), // String no vacío después de trim()
    duration: z.number().min(1), // Número positivo mayor a 0
    price: z.number().min(1), // Número positivo mayor a 0
    category: z.string().trim().min(1), // String no vacío después de trim()
    available: z.boolean() // Valor booleano obligatorio
})

// Ejemplo de request válida:
// req.body = {
//     name: "Consulta médica",
//     description: "Consulta general con médico",
//     duration: 30,
//     price: 12000,
//     category: "salud",
//     available: true
// }