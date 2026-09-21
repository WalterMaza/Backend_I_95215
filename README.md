# Clase 5 · Arquitectura en capas

Continuación de WalterMaza/Backend_I_95215, rama CLASE_4.

## Iniciar

```bash
npm install
npm run dev
```

La API escucha en http://localhost:8080. Conserva Express y los módulos ESM.

`src/config/env.config.js` lee `process.env.PORT`, con 8080 como valor predeterminado.
`.env.example` documenta la configuración: no se carga automáticamente.
Opcional, con Node 20.6 o posterior: copiar `.env.example` como `.env` y ejecutar
`node --env-file=.env src/server.js`. Para la clase basta `npm run dev`.

## Qué cambió y por qué

- Se quitó `src/pasos` y sus cuatro comandos del package.json.
- El código de lectura y escritura de los managers se trasladó a `src/dao`.
- Se agregaron repositories que delegan cada operación al DAO.
- Se agregaron services. Generan el ID y descartan el ID enviado al actualizar.
- Los controllers importan los services. Sus respuestas y las rutas se mantienen.
- El puerto se separó en `src/config/env.config.js`.

No se incorporaron clases, factories, inyección de dependencias, MongoDB ni middleware de errores. Usamos funciones, imports y async/await, como la base.

## Recorrido

Petición → router → controller → service → repository → DAO → archivo JSON.
El resultado vuelve mediante `return` hasta el controller, que responde al cliente.

| Archivo/carpeta | Responsabilidad |
| --- | --- |
| routes | Relacionar URL y método HTTP con un controller |
| controllers | Leer req y responder con res |
| services | Decidir las reglas del sistema y preparar los datos |
| repositories | Ofrecer acceso a datos y delegar en el DAO elegido |
| dao | Leer, buscar y escribir en JSON |
| data | Conservar los registros |

En esta versión el repository es deliberadamente pequeño: permite mostrar la separación sin introducir otra técnica. El DAO devuelve null o false cuando no encuentra un recurso; el controller conserva la respuesta 404 de la clase anterior.

## Orden sugerido para enseñar (2 horas)

1. 0–15 min: ejecutar la clase 4 y seguir un GET desde router hasta manager.
2. 15–35 min: trasladar la persistencia a DAO; comparar el código conocido.
3. 35–50 min: incorporar repository y explicar los return.
4. 50–70 min: incorporar service; recorrer GET de punta a punta.
5. 70–90 min: recorrer POST y PUT, ubicando la generación y protección del ID.
6. 90–105 min: replicar el patrón en bookings y probar el CRUD.
7. 105–120 min: practicar una regla de negocio con arrays, separada del proyecto.

## Endpoints conservados

| Método | Servicios | Reservas |
| --- | --- | --- |
| GET | /api/services | /api/bookings |
| GET por ID | /api/services/:sid | /api/bookings/:bid |
| POST | /api/services | /api/bookings |
| PUT | /api/services/:sid | /api/bookings/:bid |
| DELETE | /api/services/:sid | /api/bookings/:bid |

Ejemplo de body de servicio:

```json
{"name":"Consulta general","duration":30,"price":12000,"category":"salud","available":true}
```

Ejemplo de body de reserva (usar un ID obtenido de services):

```json
{"service":"ID_DEL_SERVICIO","quantity":1}
```

La clase 4 permite actualizaciones parciales mediante PUT: se mantiene ese comportamiento por continuidad. Semánticamente, las modificaciones parciales suelen expresarse con PATCH; aquí no cambiamos el contrato de la API.

## Diferencia entre la base y el material de Coderhouse (nota docente)

La semana 5 indica mantener los endpoints, pero enumera una reserva con varios servicios y POST /api/bookings/:bid/services/:sid. La rama CLASE_4 enlazada guarda un solo servicio por reserva y no tiene ese endpoint.

Este proyecto es el refactor de esa rama: mantiene su modelo y sus endpoints. No implementa el modelo completo de reservas de la consigna. Para enseñar la regla de incrementar cantidades sin resolverla directamente, usar el ejercicio independiente de lista de materiales que sigue.

## Ejercicio resuelto: acumular cantidades (fuera del proyecto)

Objetivo: una lista de materiales guarda referencias por ID. Si un material ya estaba, aumentar su cantidad. Esta decisión pertenece al service, no a la lectura/escritura del DAO.

### 1. Encontrar un material

```js
const materiales = [{ id: 'm1', nombre: 'Tornillo' }]
const material = materiales.find(item => item.id === 'm1')
console.log(material) // { id: 'm1', nombre: 'Tornillo' }
```

### 2. Guardar solo la referencia

```js
const lista = { id: 'l1', materiales: [] }
lista.materiales.push({ material: 'm1', quantity: 1 })
console.log(lista.materiales) // [{ material: 'm1', quantity: 1 }]
```

### 3. Incrementar en lugar de duplicar

```js
const existente = lista.materiales.find(item => item.material === 'm1')
if (existente) {
  existente.quantity += 1
} else {
  lista.materiales.push({ material: 'm1', quantity: 1 })
}
console.log(lista.materiales) // [{ material: 'm1', quantity: 2 }]
```

`find` devuelve el objeto que está dentro del array: modificar quantity modifica ese objeto. Todavía no se escribió ningún archivo.

### 4. Convertirlo en una regla de service

Este fragmento muestra la regla completa sobre datos recibidos, sin Express ni FileSystem:

```js
function agregarMaterial(lista, material) {
  if (!lista) throw new Error('Lista no encontrada')
  if (!material) throw new Error('Material no encontrado')

  const existente = lista.materiales.find(item => item.material === material.id)
  if (existente) {
    existente.quantity += 1
  } else {
    lista.materiales.push({ material: material.id, quantity: 1 })
  }
  return lista
}

const listaPrueba = { id: 'l1', materiales: [] }
const tornillo = { id: 'm1', nombre: 'Tornillo' }
agregarMaterial(listaPrueba, tornillo)
agregarMaterial(listaPrueba, tornillo)
console.log(listaPrueba.materiales) // Un elemento, quantity: 2
```

En una aplicación con capas, el service obtiene la lista y el material mediante sus repositories, aplica esta regla y pide guardar mediante `repository.update`. El DAO recibe el resultado y lo persiste: no decide si sumar o insertar.

## Alcance didáctico

El refactor conserva las validaciones limitadas de la clase 4. No agrega validaciones de campos ni verifica que el ID del servicio de una reserva exista. Esas reglas pueden practicarse en el service por separado. Tampoco resuelve escrituras concurrentes en JSON: es una base para practicar localmente, antes de trabajar con una base de datos.
