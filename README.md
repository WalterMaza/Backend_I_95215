# Sistema de Gestión de Turnos y Reservas - Clase 2

## Servidores con Express y API REST

Este proyecto es una implementación práctica de los conceptos aprendidos en la Clase 2 del curso de Backend I. Demuestra la creación de un servidor web utilizando Express.js y el desarrollo de una API REST básica para un sistema de gestión de turnos y reservas.

## 📋 Contenido de la Clase 2

### Conceptos Principales

- **Express.js**: Framework minimalista para Node.js que facilita la creación de servidores web y APIs
- **API REST**: Arquitectura de interfaz de programación de aplicaciones que utiliza los métodos HTTP (GET, POST, PUT, DELETE)
- **Rutas**: Definición de endpoints que responden a las solicitudes de los clientes
- **Middleware**: Funciones que tienen acceso al objeto de solicitud (req) y respuesta (res)
- **Variables de entorno**: Configuración sensible del servidor usando archivos .env

## 🚀 Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución JavaScript del lado del servidor
- **Express.js**: Framework web para Node.js (v5.2.1)
- **dotenv**: Módulo para cargar variables de entorno (v17.4.2)

## 📁 Estructura del Proyecto

```
backend-turnos-reservas/
├── .env                 # Variables de entorno
├── src/                 # Carpeta principal del código fuente
│   ├── app.js          # Configuración de Express y rutas
│   └── server.js       # Punto de entrada del servidor
├── package.json        # Dependencias del proyecto
└── README.md           # Documentación
```

## 🔧 Instalación

1. Clonar el repositorio y cambiar a la rama CLASE_2:
```bash
git clone <URL_DEL_REPOSITORIO>
cd backend-turnos-reservas
git checkout CLASE_2
```

2. Instalar las dependencias:
```bash
npm install
```

3. Configurar las variables de entorno en el archivo `.env`:
```
PORT=8080
```

## ▶️ Ejecución

Iniciar el servidor en modo desarrollo:
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:8080`

## 🌐 Endpoints de la API

### GET `/`
Endpoint de bienvenida que confirma que la API está funcionando.

**Respuesta:**
```json
{
  "status": "success",
  "message": "API del Sistema de Turnos y Reservas"
}
```

### GET `/api/services`
Retorna la lista de servicios disponibles en el sistema.

**Respuesta:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Consulta médica general",
      "duration": 30,
      "price": 12000,
      "category": "salud",
      "available": true
    },
    {
      "id": 2,
      "name": "Sesión de fisioterapia",
      "duration": 45,
      "price": 15000,
      "category": "rehabilitación",
      "available": true
    }
  ]
}
```

## 📚 Conceptos Implementados

### 1. Configuración de Express
```javascript
import express from "express"
const app = express()
```

### 2. Definición de Rutas
```javascript
app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "API del Sistema de Turnos y Reservas"
    })
})
```

### 3. Respuestas JSON
Todas las respuestas siguen un formato consistente con `status` y `data/message`.

### 4. Variables de Entorno
```javascript
import "dotenv/config"
const PORT = process.env.PORT
```

### 5. Inicio del Servidor
```javascript
app.listen(PORT, () => {
    console.log("Servidor corriendo en http://localhost:8080")
})
```

## 🎯 Objetivos de Aprendizaje

- ✅ Crear un servidor web con Express.js
- ✅ Implementar rutas básicas de una API REST
- ✅ Manejar respuestas JSON con códigos de estado HTTP
- ✅ Utilizar variables de entorno para configuración
- ✅ Estructurar un proyecto backend de manera modular

## 🔮 Próximos Pasos

Para las siguientes clases se podrían implementar:
- Métodos HTTP adicionales (POST, PUT, DELETE)
- Conexión a base de datos
- Validación de datos
- Autenticación y autorización
- Manejo de errores avanzado

## 📝 Notas de la Clase

Este proyecto sirve como base para entender los fundamentos de la creación de APIs REST con Express. Los datos actualmente se almacenan en memoria (array), pero en un entorno de producción se utilizaría una base de datos persistente.

## 🌿 Acceso a la Rama CLASE_2 en GitHub

Este proyecto se encuentra en la rama `CLASE_2` del repositorio. La rama `main` contiene el código de la Clase 1.

### Para acceder a la rama CLASE_2:

**Si ya tienes el repositorio clonado:**
```bash
git checkout CLASE_2
```

**Si estás clonando el repositorio por primera vez:**
```bash
git clone -b CLASE_2 <URL_DEL_REPOSITORIO>
```

**Para ver todas las ramas disponibles:**
```bash
git branch -a
```

**Para actualizar tu rama local con los cambios de GitHub:**
```bash
git pull origin CLASE_2
```

