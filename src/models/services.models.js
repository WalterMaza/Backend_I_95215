import mongoose from "mongoose"

const serviceSchema = new mongoose.Schema({

  name: { type: String, required: true },
  description: { type: String},
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  available: { type: Boolean, default: true }
})

export default mongoose.model("Service", serviceSchema)
