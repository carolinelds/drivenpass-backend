import { Router } from "express";
import { validateToken } from "../middlewares/authMiddleware.js";
import validSchema from "./../middlewares/validateSchema.js";
import cardsSchema from "../schemas/cardsSchema.js";
import { createCard, getCards, deleteCard } from "./../controllers/cardsController.js";

const cardsRouter = Router();

cardsRouter.post("/cards",
    validateToken,
    validSchema(cardsSchema, "Input data"),
    createCard
);

cardsRouter.get("/cards",
    validateToken,
    getCards
);

cardsRouter.delete("/cards/:id",
    validateToken,
    deleteCard
);

export default cardsRouter;