import Cryptr from "cryptr";
import "./../setup.js";
import { Credentials } from "@prisma/client";
import errorResponses from "./../responses/errorResponses.js";
import credentialsRepository from "./../repositories/credentialsRepository.js";

export type CreateCredentialData = Omit<Credentials, "id">;

async function createCredential(idUser: number, url: string, username: string, password: string, title: string){

    const checkTitle = await credentialsRepository.findByTitleAndUserId(title, idUser);
    if (checkTitle.length > 0){
        return errorResponses.conflict("Title");
    };

    const cryptr = new Cryptr(process.env.CRYPTR_SECRET);
    const encryptedPassword = cryptr.encrypt(password);

    const newCredential: CreateCredentialData = {
        idUser,
        url,
        username,
        password: encryptedPassword,
        title
    };

    await credentialsRepository.addNewCredential(newCredential);
};

async function getCredentialsByUserId(idUser: number){
    const result = await credentialsRepository.findByUserId(idUser);

    if (result.length === 0){
        return errorResponses.notFound("Credentials for this user");
    };

    const cryptr = new Cryptr(process.env.CRYPTR_SECRET);
    for (let r in result){
        result[r].password = cryptr.decrypt(result[r].password);
    };

    return result;
};

async function getCredentialByIdAndUserId(id: number, idUser: number){
    const result = await credentialsRepository.findByIdAndUserId(id, idUser);
    if (!result){
        return errorResponses.notFound("This credential for this user was");
    };

    const cryptr = new Cryptr(process.env.CRYPTR_SECRET);
    result.password = cryptr.decrypt(result.password);

    return result;
};

async function deleteCredential(id: number, idUser: number){
    const checkExists = await credentialsRepository.findByIdAndUserId(id, idUser);
    if (!checkExists){
        return errorResponses.notFound("This credential for this user was");
    }

    await credentialsRepository.deleteById(id);
};


const credentialsService = {
    createCredential,
    getCredentialsByUserId,
    getCredentialByIdAndUserId,
    deleteCredential
};

export default credentialsService;