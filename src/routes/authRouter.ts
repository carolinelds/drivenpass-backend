import { Router } from "express";
import { createUser, login } from "./../controllers/authController.js";
import { validateToken } from "./../middlewares/authMiddleware.js";
import validSchema from "./../middlewares/validateSchema.js";
import authSchema from "./../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/user/signup", 
    validSchema(authSchema.createUserSchema, "User email and/or password"),
    createUser
);

authRouter.post("/user/signin",
    validSchema(authSchema.loginSchema, "User email and/or password"),
    login
)

export default authRouter;