import { Router } from "express";
import authRouter from "./authRouter.js";
import credentialsRouter from "./credentialsRouter.js";
import wifiRouter from "./wifiRouter.js";
import cardsRouter from "./cardsRouter.js";

const router = Router();
router.use(authRouter);
router.use(credentialsRouter);
router.use(wifiRouter);
router.use(cardsRouter);

export default router;