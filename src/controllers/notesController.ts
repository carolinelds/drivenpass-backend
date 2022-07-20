import { Cards, SecureNotes } from "@prisma/client";
import { Request, Response } from "express";
import notesService from "./../services/notesService.js";

export async function createNote(req: Request, res: Response){
    const idUser: number = parseInt(res.locals.idUser);
    const { title, text } : { title: string, text: string } 
    = res.locals.body;

    await notesService.createNote(idUser, title, text);

    res.status(201).send("Secure note created.");
};

export async function getNotes(req: Request, res: Response){
    const { id } = req.query;
    const idUser = res.locals.idUser;
    
    let result : SecureNotes | SecureNotes[] | { type: string, message: string};

    if (typeof id === "string"){
        result = await notesService.getNoteByIdAndUserId(parseInt(id), idUser);
    } else {
        result = await notesService.getNotesByUserId(idUser);
    }
    
    res.status(200).send(result);
};

export async function deleteNote(req: Request, res: Response){
    const { id } = req.params;
    const idUser = res.locals.idUser;

    await notesService.deleteNote(parseInt(id), idUser);

    res.status(200).send("Secure note deleted.");
}