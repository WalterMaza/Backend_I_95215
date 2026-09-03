import { getBookings, getBookingById, addBooking, updateBooking, deleteBooking } from "../managers/BookingManager.js"

// controller que (1)obtiene todas las reservas pidiendoselas al la siguiente
// etapa (en este caso es el manager), y luego (2)responde al frontend
export async function controllerGetAll(req, res) {

    try {
        
        const bookings = await getBookings()

        res.status(200).json({ status: "success", data: bookings })
        
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }
    
}

export async function controllerGet(req, res) {
    try {
        const { bid } = req.params
        const booking = await getBookingById(bid)

        if (!booking) {
            return res.status(404).json({ status: "error", message: "Booking not found" })
        }

        res.status(200).json({ status: "success", data: booking })
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }
}

export async function controllerCreate(req, res) {
    try {
        const newBooking = await addBooking(req.body)
        res.status(201).json({ status: "success", data: newBooking })
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }
}

export async function controllerUpdate(req, res) {
    try {
        const { bid } = req.params
        const updatedBooking = await updateBooking(bid, req.body)

        if (!updatedBooking) {
            return res.status(404).json({ status: "error", message: "Booking not found" })
        }

        res.status(200).json({ status: "success", data: updatedBooking })
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }
}

export async function controllerDelete(req, res) {
    try {
        const { bid } = req.params
        const deleted = await deleteBooking(bid)

        if (!deleted) {
            return res.status(404).json({ status: "error", message: "Booking not found" })
        }

        res.status(200).json({ status: "success", message: "Booking deleted successfully" })
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }
}
