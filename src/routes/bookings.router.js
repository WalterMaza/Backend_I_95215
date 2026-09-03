import express from "express"
import { controllerGetAll,
    controllerGet,
    controllerCreate,
    controllerUpdate,
    controllerDelete
} from "../controllers/bookings.controller.js"

const router = express.Router()

router.get("/", controllerGetAll)

router.get("/:bid", controllerGet)

router.post("/", controllerCreate)

router.put("/:bid", controllerUpdate)

router.delete("/:bid", controllerDelete)

export default router
