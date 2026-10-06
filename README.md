# Clase 8 · Consultas Avanzadas, Validación y Populate

Curso de Programación Backend I - Coderhouse

## Iniciar

```bash
npm install
npm run dev
```

La API escucha en http://localhost:8080. 

**Importante:** Antes de iniciar, asegúrate de configurar la variable de entorno `MONGODB_URI` en el archivo `.env` con tu cadena de conexión de MongoDB Atlas.

## Cambios realizados en esta clase

### 1. Consultas Avanzadas (Filtros, Paginación y Ordenamiento)

Se implementaron consultas avanzadas en el endpoint `GET /api/services` utilizando el plugin `mongoose-paginate-v2`. Esto permite filtrar, paginar y ordenar los resultados de manera eficiente.

#### Implementación por capas

**Controller (`src/controllers/services.controller.js`):**
- Extrae los query params de la URL (`category`, `available`, `page`, `limit`, `sort`)
- Construye objetos `filters` y `options` para enviar a las capas inferiores
- Ejemplo de datos capturados:
  ```javascript
  // URL: GET /api/services?category=salud&available=true&page=1&limit=5&sort=desc
  req.query = { category: "salud", available: "true", page: "1", limit: "5", sort: "desc" }
  
  // Datos enviados al service:
  filters = { category: "salud", available: "true" }
  options = { page: "1", limit: "5", sort: "desc" }
  ```

**Service (`src/services/services.service.js`):**
- Recibe y pasa los parámetros al repository sin modificarlos
- Mantiene la responsabilidad de lógica de negocio separada del acceso a datos

**Repository (`src/repositories/services.repository.js`):**
- Actúa como intermediario entre service y DAO
- Delega la ejecución de la consulta al DAO con los parámetros recibidos

**DAO (`src/dao/services.dao.js`):**
- Construye el query de MongoDB dinámicamente según los filtros
- Configura las opciones de paginación y ordenamiento
- Usa `Service.paginate()` del plugin mongoose-paginate-v2
- Retorna un objeto con metadata de paginación y los documentos

#### Ejemplos de uso con Postman

**Filtrar por categoría:**
```
GET http://localhost:8080/api/services?category=salud
```
Respuesta:
```json
{
  "status": "success",
  "data": {
    "docs": [...],
    "totalDocs": 2,
    "totalPages": 1,
    "page": 1,
    "limit": 10,
    ...
  }
}
```

**Filtrar por disponibilidad:**
```
GET http://localhost:8080/api/services?available=true
```

**Paginación:(cargar un buena cantidad de servicios para esta prueba)**
```
GET http://localhost:8080/api/services?page=1&limit=5
```

**Ordenamiento por precio:**
```
GET http://localhost:8080/api/services?sort=desc
```
- `sort=asc`: orden ascendente (menor a mayor)
- `sort=desc`: orden descendente (mayor a menor)

**Combinar filtros, paginación y ordenamiento:**
```
GET http://localhost:8080/api/services?category=estetica&available=true&page=1&limit=10&sort=asc
```

### 2. Validación con Zod

Se implementó validación de datos de entrada usando la librería **Zod**, una librería de validación de esquemas TypeScript-first. Esto asegura que los datos recibidos en las requests cumplan con la estructura y tipos esperados antes de procesarlos.

#### Archivos creados

**Middleware de validación (`src/middlewares/validateBody.js`):**
- Middleware que intercepta las requests antes del controller
- Valida `req.body` contra un esquema Zod usando `safeParse()`
- Si la validación falla, retorna error 400 con detalles de los campos inválidos
- Si es exitosa, reemplaza `req.body` con los datos validados

**Esquema de validación (`src/validations/service.validations.js`):**
- Define el esquema Zod para crear servicios
- Especifica tipos, validaciones y reglas para cada campo
- Ejemplo del esquema:
  ```javascript
  export const createServiceSchema = z.object({
    name: z.string().trim().min(1),        // String no vacío
    description: z.string().trim().min(1), // String no vacío
    duration: z.number().min(1),           // Número positivo
    price: z.number().min(1),              // Número positivo
    category: z.string().trim().min(1),    // String no vacío
    available: z.boolean()                 // Booleano obligatorio
  })
  ```

**Router actualizado (`src/routes/services.router.js`):**
- Agrega el middleware `validateBody` antes del controller en la ruta POST
- Aplica el esquema `createServiceSchema` para validar el body

#### Ejemplos de uso con Postman

**Request válida:**
```
POST http://localhost:8080/api/services
Content-Type: application/json

{
  "name": "Consulta médica",
  "description": "Consulta general con médico",
  "duration": 30,
  "price": 12000,
  "category": "salud",
  "available": true
}
```
Respuesta: `201 Created` con el servicio creado

**Request inválida (campo faltante):**
```
POST http://localhost:8080/api/services
Content-Type: application/json

{
  "name": "Consulta médica",
  "price": 12000
}
```
Respuesta: `400 Bad Request`
```json
{
  "status": "error",
  "message": "Datos inválidos",
  "error": [
    { "field": "description", "message": "Required" },
    { "field": "duration", "message": "Required" },
    { "field": "category", "message": "Required" },
    { "field": "available", "message": "Required" }
  ]
}
```

**Request inválida (tipo incorrecto):**
```
POST http://localhost:8080/api/services
Content-Type: application/json

{
  "name": "Consulta médica",
  "description": "Consulta general",
  "duration": "30",  // String en lugar de número
  "price": 12000,
  "category": "salud",
  "available": true
}
```
Respuesta: `400 Bad Request`
```json
{
  "status": "error",
  "message": "Datos inválidos",
  "error": [
    { "field": "duration", "message": "Expected number, received string" }
  ]
}
```

### 3. Populate (Consultas con relaciones)

Se implementó el uso de **populate** de Mongoose para resolver relaciones entre documentos. Esto permite obtener datos completos de documentos relacionados en una sola consulta, en lugar de solo sus IDs.

#### Modelo de Bookings actualizado

El modelo `Bookings` fue actualizado para incluir una relación con `Services`:
```javascript
services: [{
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Services",  // Referencia al modelo Services
    required: true
  },
  quantity: { type: Number, default: 1 }
}]
```

#### Implementación en DAO

En `src/dao/bookings.dao.js`, el método `getById()` usa `populate()`:
```javascript
const booking = await Booking.findById(id).populate('services.service');
```

- Sin `populate()`: `services.service` contiene solo el ObjectId (ej: `"507f1f77bcf86cd799439011"`)
- Con `populate()`: `services.service` contiene el documento completo del servicio con todos sus campos

#### Ejemplos de uso con Postman

**Obtener una reserva con populate:**
```
GET http://localhost:8080/api/bookings/:bid
```

Respuesta (sin populate - solo IDs):
```json
{
  "_id": "...",
  "clientName": "Juan Pérez",
  "clientEmail": "juan@example.com",
  "date": "2026-10-10",
  "time": "10:00",
  "status": "pending",
  "services": [
    {
      "service": "507f1f77bcf86cd799439011",  // Solo el ObjectId
      "quantity": 2
    }
  ]
}
```

Respuesta (con populate - documentos completos):
```json
{
  "_id": "...",
  "clientName": "Juan Pérez",
  "clientEmail": "juan@example.com",
  "date": "2026-10-10",
  "time": "10:00",
  "status": "pending",
  "services": [
    {
      "service": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Consulta médica general",
        "description": "Consulta general con médico",
        "duration": 30,
        "price": 12000,
        "category": "salud",
        "available": true
      },
      "quantity": 2
    }
  ]
}
```

## Endpoints disponibles

### Services

| Método | Endpoint | Descripción | Query Params |
| --- | --- | --- | --- |
| GET | `/api/services` | Obtener servicios con filtros, paginación y ordenamiento | `category`, `available`, `page`, `limit`, `sort` |
| GET | `/api/services/:sid` | Obtener un servicio por ID | - |
| POST | `/api/services` | Crear un nuevo servicio (con validación Zod) | - |
| PUT | `/api/services/:sid` | Actualizar un servicio existente | - |
| DELETE | `/api/services/:sid` | Eliminar un servicio | - |

### Bookings

| Método | Endpoint | Descripción |
| --- | --- | --- |
| GET | `/api/bookings` | Obtener todas las reservas |
| GET | `/api/bookings/:bid` | Obtener una reserva por ID (con populate) |
| POST | `/api/bookings` | Crear una nueva reserva |
| PUT | `/api/bookings/:bid` | Actualizar una reserva existente |
| DELETE | `/api/bookings/:bid` | Eliminar una reserva |


