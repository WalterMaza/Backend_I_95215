// En este archivo se realizan las operaciones de lógica de negocio
// La lógica de negocio es la parte del código que define cómo se van a procesar los datos

import { getServices, getServiceById, addService, updateService, deleteService } from "../services/services.service.js"


export async function controllerGetAll(req, res) {

    try {
        
        const services = await getServices()

        res.status(200).json({ status: "success", data: services })
        
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }
    
}

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

export async function controllerCreate(req, res) {
    try {
        const newService = await addService(req.body)
        res.status(201).json({ status: "success", data: newService })
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }
}

export async function controllerUpdate(req, res) {
    try {
        const { sid } = req.params
        const updatedService = await updateService(sid, req.body)

        if (!updatedService) {
            return res.status(404).json({ status: "error", message: "Service not found" })
        }

        res.status(200).json({ status: "success", data: updatedService })
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }
}

export async function controllerDelete(req, res) {
    try {
        const { sid } = req.params
        const deleted = await deleteService(sid)

        if (!deleted) {
            return res.status(404).json({ status: "error", message: "Service not found" })
        }

        res.status(200).json({ status: "success", message: "Service deleted successfully" })
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }
}




