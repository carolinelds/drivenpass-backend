import { Request, Response } from "express";
import credentialsService from "./../services/credentialsService.js";

export async function createCredential(req: Request, res: Response){
    const idUser: number = parseInt(res.locals.idUser);
    const { url, username, password, title } : { url : string, username: string, password: string, title: string} = res.locals.body;

    await credentialsService.createCredential(idUser, url, username, password, title);

    res.status(201).send("Credential created.");
}