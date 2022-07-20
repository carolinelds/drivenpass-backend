import { Router } from "express";
import { validateToken } from "../middlewares/authMiddleware.js";
import validSchema from "./../middlewares/validateSchema.js";
import wifiSchema from "./../schemas/wifiSchema.js";
import { createWifi, getWifi, deleteWifi } from "./../controllers/wifiController.js";

const wifiRouter = Router();

wifiRouter.post("/wifi",
    validateToken,
    validSchema(wifiSchema, "Input data"),
    createWifi
);

wifiRouter.get("/wifi",
    validateToken,
    getWifi
);

wifiRouter.delete("/wifi/:id",
    validateToken,
    deleteWifi
);

export default wifiRouter;