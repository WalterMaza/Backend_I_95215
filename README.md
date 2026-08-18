# Backend de Turnos y Reservas - Proyecto Base

Proyecto base de Node.js para el desarrollo de un sistema backend de gestión de turnos y reservas.

## 📋 Descripción del Proyecto

Este es un proyecto inicial que servirá como base para construir un sistema backend completo. Actualmente implementa una estructura básica con módulos ES6 para demostrar la correcta configuración e importación/exportación entre archivos.

## 🔧 Tecnologías

- Node.js
- ES Modules (ESM)
- dotenv (para gestión de variables de entorno)

## 📦 Instalación

```bash
npm install
```

## 🚀 Cómo Iniciar el Proyecto

```bash
npm run dev
```

Este comando utiliza `node --watch` para reiniciar automáticamente el servidor cuando se detectan cambios en los archivos.

## 📝 type:module

El archivo `package.json` incluye la configuración `"type": "module"`. Esta es una configuración crucial que indica a Node.js que este proyecto debe utilizar **ES Modules (ESM)** en lugar de CommonJS.

### ¿Qué es type:module?

- `"type": "module"` es una configuración en el `package.json` que habilita el sistema de módulos ECMAScript (ESM) en todo el proyecto
- Cuando esta opción está activada, Node.js trata todos los archivos `.js` como módulos ES6
- Esto permite el uso de sintaxis moderna como `import` y `export`

## 🔄 ESM vs CommonJS

### ESM (ECMAScript Modules)

ESM es el estándar moderno de módulos en JavaScript, nativo del lenguaje:

**Sintaxis de importación:**
```javascript
import { app } from "./app.js"
import express from "express"
```

**Sintaxis de exportación:**
```javascript
export const app = { ... }
export default function() { ... }
```

**Características:**
- Sintaxis moderna y estándar
- Soporte para importaciones asíncronas
- Mejor optimización para tree-shaking
- Es el estándar oficial de JavaScript
- Compatible con navegadores modernos

### CommonJS

CommonJS es el sistema de módulos tradicional de Node.js:

**Sintaxis de importación:**
```javascript
const app = require("./app")
const express = require("express")
```

**Sintaxis de exportación:**
```javascript
module.exports = { ... }
exports.app = { ... }
```

**Características:**
- Sistema original de Node.js
- Síncrono por naturaleza
- Ampliamente utilizado en ecosistema Node.js
- No compatible nativamente con navegadores

## ✅ Por qué utilizamos type:module

En este proyecto utilizamos `"type": "module"` (ESM) por las siguientes razones:

1. **Estándar moderno**: ESM es el estándar oficial de JavaScript para módulos
2. **Sintaxis más limpia**: `import/export` es más intuitivo y legible que `require/module.exports`
3. **Compatibilidad**: Funciona tanto en Node.js como en navegadores modernos
4. **Futuro-proof**: Es la dirección hacia la que evoluciona el ecosistema JavaScript
5. **Mejor rendimiento**: Permite optimizaciones como tree-shaking en bundlers

## 📁 Estructura del Proyecto

```
.
├── src/
│   ├── app.js          # Configuración principal de la aplicación
│   └── server.js       # Punto de entrada del servidor
├── .env                # Variables de entorno
├── .gitignore          # Archivos ignorados por Git
├── package.json        # Configuración del proyecto y dependencias
└── README.md           # Este archivo
```

## 🔍 Ejemplo de Uso

El proyecto actual demuestra la importación/exportación entre módulos:

**app.js** - Exporta un objeto con información de la aplicación:
```javascript
export const app = {
  name: 'Sistema Backend de Turnos y Reservas',
  version: '1.0.0',
  status: 'initial setup'
};
```

**server.js** - Importa y utiliza el objeto exportado:
```javascript
import { app } from "./app.js"

console.log('Aplicación inicializada');
console.log(app);
```

## 📚 Próximos Pasos

En las siguientes clases este proyecto se expandirá para incluir:
- Configuración de un servidor HTTP
- Implementación de rutas y endpoints
- Conexión a base de datos
- Autenticación y autorización
- Gestión de turnos y reservas

## TEMA DOTENV Y .ENV:

## 1. ¿Qué problemática solucionan la librería `dotenv` y  el archivo `.env`?

En una aplicación Node.js con Express y Mongoose existen datos de configuración que no deberían estar escritos directamente en el código fuente.

Por ejemplo, una conexión a MongoDB podría escribirse así:

```js
mongoose.connect("mongodb+srv://usuario:password@cluster.mongodb.net/backend");
```

Esto genera varios problemas:

- **Seguridad:** las credenciales de MongoDB quedan expuestas en el código.
- **Mantenimiento:** cambiar una contraseña, puerto o URL requiere modificar archivos del proyecto.
- **Diferentes entornos:** desarrollo, testing y producción pueden necesitar configuraciones diferentes.
- **Git/GitHub:** si el proyecto se sube a un repositorio, las credenciales podrían quedar expuestas.
- **Configuración dispersa:** distintos valores de configuración pueden terminar distribuidos por diferentes archivos del proyecto.

Para solucionar este problema podemos almacenar la configuración fuera del código utilizando variables de entorno.

De esta manera, nuestro código utiliza las variables (datos) sin tener que conocer directamente sus valores:





> **Importante:** el archivo `.env` no es un mecanismo de seguridad por sí mismo. Su objetivo es separar la configuración del código. Por eso, cuando contiene credenciales o secretos, debe agregarse a `.gitignore y no subirse al repositorio.

---

## 2. ¿Qué es y cómo actúa `dotenv` combinado con `.env`?

### ¿Qué es `.env`?

`.env` es un archivo de texto utilizado habitualmente para almacenar variables de entorno necesarias para ejecutar una aplicación.

Por ejemplo:

```env
PORT=8080
MONGO_URL=mongodb://localhost:27017/backend
```

Cada línea representa una variable utilizando la siguiente estructura:

```text
NOMBRE=VALOR
```

Por ejemplo:

```env
PORT=8080
```

define una variable llamada `PORT` cuyo valor es `8080`.

### ¿Qué es `dotenv`?

`dotenv` es una librería de Node.js que permite leer las variables almacenadas en el archivo `.env` y cargarlas dentro de `process.env`.

El flujo es:

```text
.env
 │
 │ dotenv lee el archivo
 ▼
process.env
 │
 ▼
Aplicación Node.js
```

Por ejemplo, si `.env` contiene:

```env
PORT=8080
MONGO_URL=mongodb://localhost:27017/backend
```

podemos acceder a esos valores desde JavaScript:

```js
process.env.PORT
process.env.MONGO_URL
```

Por ejemplo:

```js
console.log(process.env.PORT);
```

obtendrá:

```text
8080
```

### ¿Qué es `process.env`?

`process` es un objeto global proporcionado por Node.js que contiene información relacionada con el proceso que está ejecutando nuestra aplicación.

Dentro de `process` existe `env`, que contiene las variables de entorno disponibles para ese proceso.

Por eso:

```js
process.env.PORT
```

significa que estamos accediendo a la variable de entorno llamada `PORT`.

### Flujo completo

Si tenemos:

```env
PORT=8080
MONGO_URL=mongodb://localhost:27017/backend
```

y ejecutamos:

```js
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.PORT);
console.log(process.env.MONGO_URL);
```

el proceso es:

```text
1. Node.js inicia la aplicación
          ↓
2. Se importa dotenv
          ↓
3. dotenv.config() lee .env
          ↓
4. Las variables pasan a process.env
          ↓
5. Express y Mongoose pueden utilizarlas
```

Por ejemplo, Express puede utilizar:

```js
app.listen(process.env.PORT);
```

y Mongoose:

```js
mongoose.connect(process.env.MONGO_URL);
```

De esta forma, los valores de configuración permanecen separados del código de la aplicación.

---

## 3. Implementación en un proyecto Node.js + Express + Mongoose

### Paso 1 — Instalar `dotenv`

Desde la terminal, ubicados en la carpeta raíz del proyecto:

```bash
npm install dotenv
```

Esto instala la librería y la agrega como dependencia en `package.json`.

---

### Paso 2 — Crear el archivo `.env`

En la **raíz del proyecto**, al mismo nivel que `package.json`, crear:

```text
.env
```

Por ejemplo:

```text
mi-api/
├── src/
├── node_modules/
├── .env
├── package.json
└── package-lock.json
```

Dentro de `.env` podemos colocar:

```env
PORT=8080
MONGO_URL=mongodb://localhost:27017/backend
```

Si utilizamos MongoDB Atlas:

```env
MONGO_URL=mongodb+srv://usuario:password@cluster.mongodb.net/backend
```

No colocamos `const`, `let` ni `;`.

Correcto:

```env
PORT=8080
```

Incorrecto:

```env
const PORT = 8080;
```

---

### Paso 3 — Agregar `.env` al `.gitignore`

Si el proyecto utiliza Git, debemos evitar que `.env` sea enviado al repositorio.

Crear o modificar:

```text
.gitignore
```

y agregar:

```gitignore
node_modules/
.env
```

De esta manera, `.env` seguirá existiendo en nuestra computadora, pero Git no lo incluirá en los commits.

---

### Paso 4 — Cargar `dotenv`

En el archivo principal de la aplicación, por ejemplo:

```text
src/app.js
```

importamos la librería:

```js
import dotenv from "dotenv";

dotenv.config();
```

`dotenv.config()` es el punto en el que `dotenv` lee el archivo `.env` y carga sus variables en `process.env`.

Después podremos acceder a ellas mediante:

```js
process.env.NOMBRE_VARIABLE
```

---


### Paso 5 — Crear `.env.example`

En proyectos reales es habitual crear también:

```text
.env.example
```

Este archivo contiene los nombres de las variables necesarias, pero no sus valores reales.

Por ejemplo:

```env
PORT=
MONGO_URL=
```

A diferencia de `.env`, este archivo **sí puede subirse al repositorio**, ya que sirve como referencia para que otro desarrollador sepa qué variables debe configurar.

La estructura final puede quedar:

```text
mi-api/
├── src/
│   ├── app.js
│   └── config/
│       └── database.js
├── .env
├── .env.example
├── .gitignore
├── package.json
└── package-lock.json
```

### Resumen

El funcionamiento que debemos recordar es:

```text
.env
 │
 │ contiene valores de configuración
 ▼
dotenv
 │
 │ carga las variables
 ▼
process.env
 │
 ├──► Express  → PORT
 │
 └──► Mongoose → MONGO_URL
```

> **Idea clave:** `.env` almacena la configuración, `dotenv` la carga y `process.env` permite que nuestra aplicación Node.js acceda a ella.

Esto permite mantener **la configuración separada del código**, facilita trabajar con diferentes entornos y evita colocar directamente credenciales y otros valores sensibles dentro de los archivos JavaScript.