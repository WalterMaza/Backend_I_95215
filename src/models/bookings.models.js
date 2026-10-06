import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, default: "pending" },

  services: [{
    // ObjectId guarda el identificador del documento relacionado, no una copia del servicio.
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Services", // Debe coincidir con el nombre usado por el modelo al que queremos referenciar.
      required: true
    },

    // quantity pertenece a la relación reserva-servicio: cuántas unidades de ese servicio hay en esta reserva.
    quantity: { type: Number, default: 1 }
  }]
})
export default mongoose.model("Bookings", bookingSchema)
