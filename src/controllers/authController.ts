import { Request, Response } from "express";
import authService from "./../services/authService.js";

export async function createUser(req: Request, res: Response){
    const { email, password } : { email: string, password: string} = res.locals.body;

    await authService.createUserService(email, password);
    
    res.status(200).send("User created.");
}

export async function login(req: Request, res: Response){
    const { email, password } : { email: string, password: string} = res.locals.body;

    const token = await authService.loginService(email, password);

    res.status(200).send(token);
}