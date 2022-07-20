import { Router } from "express";
import { validateToken } from "../middlewares/authMiddleware.js";
import validSchema from "./../middlewares/validateSchema.js";
import credentialsSchemas from "../schemas/credentialsSchemas.js";
import { createCredential, getCredentials, deleteCredential } from "./../controllers/credentialsController.js";

const credentialsRouter = Router();

credentialsRouter.post("/credentials",
    validateToken,
    validSchema(credentialsSchemas.createCredential, "Input data"),
    createCredential
);

credentialsRouter.get("/credentials",
    validateToken,
    getCredentials
);

credentialsRouter.delete("/credentials/:id",
    validateToken,
    deleteCredential
);

export default credentialsRouter;