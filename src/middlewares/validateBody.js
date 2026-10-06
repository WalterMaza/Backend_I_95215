// Middleware de validación usando Zod
// Este middleware intercepta las requests antes de llegar al controller
// y valida el body contra un esquema Zod definido

export const validateBody = (schema) => {

    return(req, res, next) => {
 
        // safeParse() valida req.body contra el esquema sin lanzar excepciones
        // Retorna: { success: true, data: {...} } o { success: false, error: {...} }
        const result = schema.safeParse(req.body)
        
        // Si la validación falla, retorna error 400 con detalles de los campos inválidos
        if(!result.success) {
            return res.status(400).json({
                status: "error",
                message: "Datos inválidos",
                // Mapea los errores de Zod a un formato más amigable
                error: result.error.issues.map((issue) => ({
                    field: issue.path.join("."), // Campo que falló la validación
                    message: issue.message // Mensaje de error de Zod
                }))
            })
        }
        
        // Si la validación es exitosa, reemplaza req.body con los datos validados
        // Esto asegura que los datos cumplan con el esquema (tipos, transformaciones, etc.)
        req.body = result.data
        
        // Pasa al siguiente middleware/controller
        next()
    }
}