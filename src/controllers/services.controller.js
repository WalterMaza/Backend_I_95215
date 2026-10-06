// En este archivo se realizan las operaciones de lógica de negocio
// La lógica de negocio es la parte del código que define cómo se van a procesar los datos

import { getServices, getServiceById, addService, updateService, deleteService } from "../services/services.service.js"


export async function controllerGetAll(req, res) {

    try {
        // Extraer query params de la URL para filtros y opciones de paginación
        // Ejemplo: GET /api/services?category=salud&available=true&page=1&limit=5&sort=desc
        // req.query = { category: "salud", available: "true", page: "1", limit: "5", sort: "desc" }
        const { category, available, page, limit, sort } = req.query;
        
        // Construir objeto de filtros para enviar a las capas inferiores
        // filters = { category: "salud", available: "true" }
        const filters = {};
        if (category) filters.category = category;
        if (available !== undefined) filters.available = available;
        
        // Construir objeto de opciones de paginación y ordenamiento
        // options = { page: "1", limit: "5", sort: "desc" }
        const options = {};
        if (page) options.page = page;
        if (limit) options.limit = limit;
        if (sort) options.sort = sort;
        
        // Pasar filtros y opciones al service layer
        // El flujo es: Controller -> Service -> Repository -> DAO
        const services = await getServices(filters, options)

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




