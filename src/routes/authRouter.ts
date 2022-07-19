import { Router } from "express";
import { createUser } from "./../controllers/authController.js";
import { validateToken } from "./../middlewares/authMiddleware.js";
import validSchema from "./../middlewares/validateSchema.js";
import authSchema from "./../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/user/signup", 
    validSchema(authSchema.createUserSchema, "User email and/or password"),
    createUser
);

export default authRouter;