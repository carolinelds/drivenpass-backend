import bcrypt from "bcrypt";
import errorResponses from "./../responses/errorResponses.js";
import authRepository from "./../repositories/authRepository.js";
import "./../setup.js";
import { Users } from "@prisma/client";

export type CreateUserData = Omit<Users, "id">;

export async function createUser(email: string, password: string){
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

const authService = {
    createUser
};

export default authService;