import { Credentials } from "@prisma/client";
import errorResponses from "./../responses/errorResponses.js";
import credentialsRepository from "./../repositories/credentialsRepository.js";

export type CreateCredentialData = Omit<Credentials, "id">;

async function createCredential(idUser: number, url: string, username: string, password: string, title: string){

    const checkTitle = await credentialsRepository.findByTitleAndUserId(title, idUser);
    if (checkTitle.length > 0){
        return errorResponses.conflict("Title");
    }

    const newCredential: CreateCredentialData = {
        idUser,
        url,
        username,
        password,
        title
    };

    await credentialsRepository.addNewCredential(newCredential);
}

const credentialsService = {
    createCredential
};

export default credentialsService;