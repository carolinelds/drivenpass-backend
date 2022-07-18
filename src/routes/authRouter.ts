import { Router } from "express";
import { createUser } from "./../controllers/authController.js";
import { validateToken } from "./../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post("/user/signup", createUser);

export default authRouter;