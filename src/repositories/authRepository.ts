import { Prisma } from "@prisma/client";
import prisma from "./../config/database.js";

export async function findSessionById(sessionId: number) {
    const session = await prisma.sessions.findUnique({
        where: {
            id: sessionId
        }
    });

    return session;
}

const authRepository = {
    findSessionById
};

export default authRepository;