import prisma from "./../config/database.js";
import { CreateCredentialData } from "../services/credentialsService.js";

async function findByTitleAndUserId(title: string, idUser: number){
    const credential = await prisma.credentials.findMany({
        where: {
            idUser,
            title
        }
    });

    return credential;
}

async function addNewCredential(newCredential: CreateCredentialData){
    await prisma.credentials.create({
        data: newCredential
    });
}

const credentialsRepository = {
    findByTitleAndUserId,
    addNewCredential
};

export default credentialsRepository;