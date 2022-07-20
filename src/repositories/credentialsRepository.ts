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
};

async function addNewCredential(newCredential: CreateCredentialData){
    await prisma.credentials.create({
        data: newCredential
    });
};

async function findByUserId(idUser: number){
    const result = await prisma.credentials.findMany({
        where: {
            idUser
        }
    });
    return result;
};

async function findByIdAndUserId(id: number, idUser: number){
    const result = await prisma.credentials.findFirst({
        where: {
            id,
            idUser
        }
    });
    return result;
};

async function deleteById(id: number){
    await prisma.credentials.delete({
        where: {
            id
        }
    });
};

const credentialsRepository = {
    findByTitleAndUserId,
    addNewCredential,
    findByUserId,
    findByIdAndUserId,
    deleteById
};

export default credentialsRepository;