import express from "express"
import { controllerGetAll,
    controllerGet,
    controllerCreate,
    controllerUpdate,
    controllerDelete
} from "../controllers/services.controller.js"

const router = express.Router()

router.get("/", controllerGetAll)

router.get("/:sid", controllerGet)

router.post("/", controllerCreate)

router.put("/:sid", controllerUpdate)

router.delete("/:sid", controllerDelete)

export default router
