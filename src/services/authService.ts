import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import errorResponses from "./../responses/errorResponses.js";
import authUtils from "./../utils/authUtils.js";
import authRepository from "./../repositories/authRepository.js";
import "./../setup.js";
import { Users, Sessions } from "@prisma/client";

export type CreateUserData = Omit<Users, "id">;
export type CreateSessionData = Omit<Sessions, "id">;

export async function createUserService(email: string, password: string){
    const existingEmail = await authRepository.findUserByEmail(email);
    if (existingEmail){
        return errorResponses.conflict("Email");
    }
    
    const SALT = +process.env.BCRYPT_SALT;
    const hashedPassword = bcrypt.hashSync(password, SALT);

    const newUser : CreateUserData = {
        email,
        password: hashedPassword
    }
    
    await authRepository.addNewUser(newUser);
}

export async function loginService(email: string, password: string){
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
        return errorResponses.unprocessableEntity("user email and/or password");
    }

    authUtils.checkPassword(user.password, password);

    const newSession : CreateSessionData = {
        idUser: user.id
    }

    const idSession = await authRepository.addNewSession(newSession);

    const jwtKey = process.env.JWT_SECRET;
    const token = jwt.sign({ idSession, idUser: user.id }, jwtKey);

    return token;
}

export async function logoutService(token: string){
    const jwtKey = process.env.JWT_SECRET;
    const tokenData : any = jwt.verify(token, jwtKey);

    await authRepository.deleteSession(tokenData.idSession);
}

const authService = {
    createUserService,
    loginService,
    logoutService
};

export default authService;