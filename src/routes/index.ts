import { Router } from "express";
import authRouter from "./authRouter.js";
import credentialsRouter from "./credentialsRouter.js";
import wifiRouter from "./wifiRouter.js";
import cardsRouter from "./cardsRouter.js";
import notesRouter from "./notesRouter.js";

const router = Router();
router.use(authRouter);
router.use(credentialsRouter);
router.use(wifiRouter);
router.use(cardsRouter);
router.use(notesRouter);

export default router;