import jwt, { JwtPayload } from "jsonwebtoken";
import "./../setup.js";
import { Request, Response, NextFunction } from "express";
import errorResponses from "./../responses/errorResponses.js";
import authRepository from "../repositories/authRepository.js";

export async function validateToken(req: Request, res: Response, next: NextFunction){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token) {
        return errorResponses.unauthorized("User");
    }

    let userData : any;

    try {
        userData = jwt.verify(token, process.env.JWT_SECRET);
    } catch(e) {
        return errorResponses.unauthorized("User");
    }

    const session = await authRepository.findSessionById(userData.idSession);

    if (session.idUser != userData.idUser) {
        return errorResponses.unauthorized("User");
    }

    res.locals.idUser = session.idUser;

    next()
}