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


