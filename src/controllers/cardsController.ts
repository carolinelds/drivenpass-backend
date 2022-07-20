import { Cards } from "@prisma/client";
import { Request, Response } from "express";
import cardsService from "./../services/cardsService.js";

export async function createCard(req: Request, res: Response){
    const idUser: number = parseInt(res.locals.idUser);
    const { number, cardholderName, securityCode, expirationDate, password, title, type, isVirtual } : 
    { number: string, cardholderName: string, securityCode: string, expirationDate: string, password: string, title: string, type: string, isVirtual: boolean } 
    = res.locals.body;

    await cardsService.createCard(idUser, number, cardholderName, securityCode, expirationDate, password, title, type, isVirtual);

    res.status(201).send("Card created.");
};

export async function getCards(req: Request, res: Response){
    const { id } = req.query;
    const idUser = res.locals.idUser;
    
    let result : Cards | Cards[] | { type: string, message: string};

    if (typeof id === "string"){
        result = await cardsService.getCardByIdAndUserId(parseInt(id), idUser);
    } else {
        result = await cardsService.getCardsByUserId(idUser);
    }
    
    res.status(200).send(result);
};

export async function deleteCard(req: Request, res: Response){
    const { id } = req.params;
    const idUser = res.locals.idUser;

    await cardsService.deleteCard(parseInt(id), idUser);

    res.status(200).send("Card deleted.");
}