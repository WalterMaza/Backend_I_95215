# Persistencia con FileSystem — clase de 2 horas

Proyecto incremental que continúa directamente desde una API Express con un array de servicios en memoria.

El recorrido principal es deliberadamente corto: memoria → JSON → FileSystem → `ServiceManager` → Express. El proyecto final contiene el CRUD completo para que PUT y DELETE estén disponibles aunque no lleguen a desarrollarse durante la clase.

## Instalación

```bash
npm install
```

## Pasos independientes

```bash
npm run paso:1  # array en memoria
npm run paso:2  # leer y parsear services.json
npm run paso:3  # crear UUID y guardar en el archivo
npm run paso:4  # encapsular lectura y alta en ServiceManager
```

Los pasos 3 y 4 agregan datos reales a `src/data/services.json`. Esto es intencional: permite abrir el archivo y observar la persistencia.

## API completa

```bash
npm run dev
```

La API queda disponible en `http://localhost:8080`. Podés probarla usando `requests.http` o Postman.

## Estructura final

```text
src/
├── app.js
├── server.js
├── data/
│   └── services.json
├── managers/
│   └── ServiceManager.js
└── pasos/
    ├── 01-memoria.js
    ├── 02-leer-json.js
    ├── 03-guardar-json.js
    └── 04-manager.js
```

El CRUD completo está implementado, pero el guion prioriza GET y POST. PUT y DELETE quedan disponibles si el tiempo de clase alcanza.
