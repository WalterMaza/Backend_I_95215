// app.js
import express from "express"
import path from "node:path"
import { fileURLToPath } from "node:url"

import {
  getServices,
  getServiceById,
  addService,
  updateService,
  deleteService
} from "./managers/servicesManager.js"

const app = express()

app.use(express.json())

// En módulos ESM no existen __filename y __dirname automáticamente.
const __filename = fileURLToPath(import.meta.url)
console.log(import.meta)
const __dirname = path.dirname(__filename)

// Construimos la ruta absoluta al archivo JSON.
const servicesPath = path.join(
  __dirname,
  "data",
  "services.json"
)

// Endpoint de bienvenida.
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API de servicios"
  })
})

// READ: obtiene todos los servicios.
app.get("/api/services", async (req, res) => {
  try {
    const services = await getServices(servicesPath)

    res.status(200).json({
      status: "success",
      data: services
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      status: "error",
      message: "No se pudieron obtener los servicios"
    })
  }
})

// READ: obtiene un servicio por ID.
app.get("/api/services/:sid", async (req, res) => {
  try {
    const service = await getServiceById(
      servicesPath,
      req.params.sid
    )

    if (!service) {
      return res.status(404).json({
        status: "error",
        message: "Servicio no encontrado"
      })
    }

    res.status(200).json({
      status: "success",
      data: service
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      status: "error",
      message: "No se pudo obtener el servicio"
    })
  }
})

// CREATE: agrega un servicio.
app.post("/api/services", async (req, res) => {
  try {
    const {
      name,
      duration,
      price,
      category,
      available
    } = req.body

    if (
      !name ||
      duration === undefined ||
      price === undefined ||
      !category ||
      available === undefined
    ) {
      return res.status(400).json({
        status: "error",
        message: "Todos los campos son obligatorios"
      })
    }

    const newService = await addService(
      servicesPath,
      req.body
    )

    res.status(201).json({
      status: "success",
      data: newService
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      status: "error",
      message: "No se pudo crear el servicio"
    })
  }
})

// UPDATE: modifica un servicio.
app.put("/api/services/:sid", async (req, res) => {
  try {
    const updatedService = await updateService(
      servicesPath,
      req.params.sid,
      req.body
    )

    if (!updatedService) {
      return res.status(404).json({
        status: "error",
        message: "Servicio no encontrado"
      })
    }

    res.status(200).json({
      status: "success",
      data: updatedService
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      status: "error",
      message: "No se pudo actualizar el servicio"
    })
  }
})

// DELETE: elimina un servicio.
app.delete("/api/services/:sid", async (req, res) => {
  try {
    const deleted = await deleteService(
      servicesPath,
      req.params.sid
    )

    if (!deleted) {
      return res.status(404).json({
        status: "error",
        message: "Servicio no encontrado"
      })
    }

    res.status(204).send()
  } catch (error) {
    console.error(error)

    res.status(500).json({
      status: "error",
      message: "No se pudo eliminar el servicio"
    })
  }
})

export default app