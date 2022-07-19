import prisma from "./../config/database.js";
import { CreateUserData } from "../services/authService.js";

export async function findSessionById(sessionId: number) {
    const session = await prisma.sessions.findUnique({
        where: {
            id: sessionId
        }
    });

    return session;
}

export async function addNewUser(newUser: CreateUserData){
    await prisma.users.create({
        data: newUser
    });
}

export async function findUserByEmail(email: string){
    const user = await prisma.users.findFirst({
        where: {
            email
        }
    })

    return user;
}

const authRepository = {
    findSessionById,
    addNewUser,
    findUserByEmail,
};

export default authRepository;