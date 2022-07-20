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
    }

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
}

const credentialsService = {
    createCredential
};

export default credentialsService;