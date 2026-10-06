import express from "express"
import { controllerGetAll,
    controllerGet,
    controllerCreate,
    controllerUpdate,
    controllerDelete
} from "../controllers/services.controller.js"

import { validateBody } from "../middlewares/validateBody.js"
import { createServiceSchema } from "../validations/service.validations.js"



const router = express.Router()

router.get("/", controllerGetAll)

router.get("/:sid", controllerGet)

router.post("/", validateBody(createServiceSchema), controllerCreate)

router.put("/:sid", controllerUpdate)

router.delete("/:sid", controllerDelete)

export default router

