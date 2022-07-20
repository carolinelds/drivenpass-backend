import { Router } from "express";
import { createUser, login, logout } from "./../controllers/authController.js";
import { validateToken } from "./../middlewares/authMiddleware.js";
import validSchema from "./../middlewares/validateSchema.js";
import authSchemas from "../schemas/authSchemas.js";

const authRouter = Router();

authRouter.post("/user/signup", 
    validSchema(authSchemas.createUser, "User email and/or password"),
    createUser
);

authRouter.post("/user/signin",
    validSchema(authSchemas.login, "User email and/or password"),
    login
)

authRouter.delete("/user/session",
    validateToken,
    logout
)

export default authRouter;