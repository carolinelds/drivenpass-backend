import { Credentials } from "@prisma/client";
import { Request, Response } from "express";
import credentialsService from "./../services/credentialsService.js";

export async function createCredential(req: Request, res: Response){
    const idUser: number = parseInt(res.locals.idUser);
    const { url, username, password, title } : { url : string, username: string, password: string, title: string} = res.locals.body;

    await credentialsService.createCredential(idUser, url, username, password, title);

    res.status(201).send("Credential created.");
};

export async function getCredentials(req: Request, res: Response){
    const { id } = req.query;
    const idUser = res.locals.idUser;
    
    let result : Credentials | Credentials[] | { type: string, message: string};

    if (typeof id === "string"){
        result = await credentialsService.getCredentialByIdAndUserId(parseInt(id), idUser);
    } else {
        result = await credentialsService.getCredentialsByUserId(idUser);
    }
    
    res.status(200).send(result);
};

export async function deleteCredential(req: Request, res: Response){
    const { id } = req.params;
    const idUser = res.locals.idUser;

    await credentialsService.deleteCredential(parseInt(id), idUser);

    res.status(200).send("Credential deleted.");
}