import prisma from "./../config/database.js";
import { CreateSessionData, CreateUserData } from "../services/authService.js";

async function findSessionById(sessionId: number) {
    const session = await prisma.sessions.findUnique({
        where: {
            id: sessionId
        }
    });

    return session;
}

async function addNewUser(newUser: CreateUserData){
    await prisma.users.create({
        data: newUser
    });
}

async function findUserByEmail(email: string){
    const user = await prisma.users.findFirst({
        where: {
            email
        }
    })

    return user;
}

async function addNewSession(newSession: CreateSessionData){
    const createdSession = await prisma.sessions.create({
        data: newSession
    });
    
    return createdSession.id;
}

async function deleteSession(idSession: number){
    await prisma.sessions.delete({
        where: {
            id: idSession
        }
    });
}

const authRepository = {
    findSessionById,
    addNewUser,
    findUserByEmail,
    addNewSession,
    deleteSession
};

export default authRepository;