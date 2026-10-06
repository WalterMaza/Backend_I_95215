import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2" // Plugin que agregará paginate() al modelo.

const serviceSchema = new mongoose.Schema({

  // Nuestro schema puede seguir teniendo la estructura que ya veníamos utilizando.
  name: { type: String, required: true },
  description: { type: String},
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  available: { type: Boolean, default: true }
})

// Le decimos a Mongoose que use el plugin paginate en este modelo.
serviceSchema.plugin(mongoosePaginate);

export default mongoose.model("Services", serviceSchema)

