# Routers, Controllers y Organización de la API

Proyecto de una plataforma de turnos y reservas que implementa una arquitectura REST organizada con Express, separando responsabilidades en rutas, controllers y managers para gestionar servicios y reservas (bookings).

## Descripción del Proyecto

Este proyecto es una API REST para una plataforma de turnos y reservas que permite:
- **Gestionar servicios**: Crear, leer, actualizar y eliminar servicios disponibles (consultas médicas, fisioterapia, clases, etc.)
- **Gestionar reservas (bookings)**: Crear, leer, actualizar y eliminar reservas de turnos para los servicios disponibles

La arquitectura sigue el patrón de separación de responsabilidades, donde cada capa tiene una función específica:
- **Routers**: Definen los endpoints HTTP y delegan a los controllers
- **Controllers**: Manejan la lógica de las peticiones HTTP (req/res) y delegan a los managers
- **Managers**: Contienen la lógica de negocio y persistencia de datos

## Instalación

```bash
npm install
```

## Ejecutar la API

```bash
npm run dev
```

La API queda disponible en `http://localhost:8080`.

## Estructura del Proyecto

```text
src/
├── app.js                    # Configuración principal de Express y registro de routers
├── server.js                 # Punto de entrada que inicia el servidor
├── data/                     # Archivos de persistencia (JSON)
│   ├── services.json         # Almacén de servicios
│   └── bookings.json        # Almacén de reservas
├── managers/                 # Lógica de negocio y persistencia
│   ├── ServicesManager.js    # CRUD de servicios
│   └── BookingManager.js     # CRUD de reservas
├── controllers/              # Manejo de peticiones HTTP
│   ├── services.controller.js
│   └── bookings.controller.js
├── routes/                   # Definición de endpoints
│   ├── services.router.js
│   └── bookings.router.js
└── pasos/                    # Ejercicios progresivos de la clase
    ├── 01-memoria.js
    ├── 02-leer-json.js
    ├── 03-guardar-json.js
    └── 04-manager.js
```

## Arquitectura y Separación de Responsabilidades

### 1. Routers (Express Router)

Los routers definen los endpoints HTTP y conectan las rutas con los controllers correspondientes.

**services.router.js:**
```javascript
router.get("/", controllerGetAll)           // GET /api/services
router.get("/:sid", controllerGet)          // GET /api/services/:sid
router.post("/", controllerCreate)          // POST /api/services
router.put("/:sid", controllerUpdate)       // PUT /api/services/:sid
router.delete("/:sid", controllerDelete)    // DELETE /api/services/:sid
```

**bookings.router.js:**
```javascript
router.get("/", controllerGetAll)           // GET /api/bookings
router.get("/:bid", controllerGet)          // GET /api/bookings/:bid
router.post("/", controllerCreate)          // POST /api/bookings
router.put("/:bid", controllerUpdate)       // PUT /api/bookings/:bid
router.delete("/:bid", controllerDelete)    // DELETE /api/bookings/:bid
```

### 2. Controllers

Los controllers manejan la interacción con las peticiones HTTP (request/response), validan parámetros, manejan errores y delegan la lógica de negocio a los managers.

**Responsabilidades:**
- Extraer parámetros de la URL (`req.params`)
- Leer el body de la petición (`req.body`)
- Llamar a los managers para ejecutar operaciones
- Enviar respuestas HTTP con códigos de estado apropiados
- Manejar errores y responder con mensajes claros

**Ejemplo (services.controller.js):**
```javascript
export async function controllerGet(req, res) {
    try {
        const { sid } = req.params
        const service = await getServiceById(sid)
        if (!service) {
            return res.status(404).json({ status: "error", message: "Service not found" })
        }
        res.status(200).json({ status: "success", data: service })
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }
}
```

### 3. Managers

Los managers contienen la lógica de negocio y la persistencia de datos. Son independientes de Express y pueden ser reutilizados en otros contextos.

**Responsabilidades:**
- Leer y escribir archivos JSON (persistencia)
- Generar IDs únicos (UUID)
- Validar y transformar datos
- Implementar la lógica CRUD

**Ejemplo (ServicesManager.js):**
```javascript
export async function addService(serviceData) {
    const services = await getServices()
    const newService = {
        id: randomUUID(),
        name: serviceData.name,
        duration: serviceData.duration,
        price: serviceData.price,
        category: serviceData.category,
        available: serviceData.available
    }
    services.push(newService)
    await fs.writeFile(FILE_PATH, JSON.stringify(services, null, 2))
    return newService
}
```

## API Endpoints

### Servicios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/services` | Obtener todos los servicios |
| GET | `/api/services/:sid` | Obtener un servicio por ID |
| POST | `/api/services` | Crear un nuevo servicio |
| PUT | `/api/services/:sid` | Actualizar un servicio |
| DELETE | `/api/services/:sid` | Eliminar un servicio |

**Ejemplo de servicio:**
```json
{
  "id": "cbd26ef5-4f83-4bd9-9a58-493f7fca1c06",
  "name": "Consulta médica general",
  "duration": 30,
  "price": 12000,
  "category": "salud",
  "available": true
}
```

### Reservas (Bookings)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/bookings` | Obtener todas las reservas |
| GET | `/api/bookings/:bid` | Obtener una reserva por ID |
| POST | `/api/bookings` | Crear una nueva reserva |
| PUT | `/api/bookings/:bid` | Actualizar una reserva |
| DELETE | `/api/bookings/:bid` | Eliminar una reserva |

**Ejemplo de reserva:**
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "service": "cbd26ef5-4f83-4bd9-9a58-493f7fca1c06",
  "quantity": 1
}
```

## Flujo de una Petición

1. **Cliente** envía una petición HTTP (ej: `POST /api/bookings`)
2. **Router** (`bookings.router.js`) recibe la petición y la delega al controller correspondiente
3. **Controller** (`bookings.controller.js`) extrae datos de `req.body` y llama al manager
4. **Manager** (`BookingManager.js`) ejecuta la lógica de negocio y persiste en `bookings.json`
5. **Controller** recibe el resultado y envía la respuesta HTTP al cliente
6. **Cliente** recibe la respuesta con el resultado de la operación

## Ventajas de esta Arquitectura

- **Separación de responsabilidades**: Cada capa tiene una función específica y clara
- **Mantenibilidad**: Fácil de modificar y extender sin afectar otras partes
- **Reutilización**: Los managers pueden usarse fuera del contexto HTTP
- **Testeabilidad**: Cada capa puede probarse independientemente
- **Escalabilidad**: Fácil agregar nuevos recursos siguiendo el mismo patrón
