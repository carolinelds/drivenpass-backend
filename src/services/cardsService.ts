import Cryptr from "cryptr";
import "./../setup.js";
import { Cards } from "@prisma/client";
import errorResponses from "./../responses/errorResponses.js";
import cardsRepository from "./../repositories/cardsRepository.js";

export type CreateCardData = Omit<Cards, "id">;

async function createCard(idUser: number, number: string, cardholderName: string, securityCode: string, expirationDate: string, password: string, title: string, type: string, isVirtual: boolean){

    const checkTitle = await cardsRepository.findByTitleAndUserId(title, idUser);
    if (checkTitle.length > 0){
        return errorResponses.conflict("Title");
    };

    const cryptr = new Cryptr(process.env.CRYPTR_SECRET);
    const encryptedPassword = cryptr.encrypt(password);
    const encryptedSecurityCode = cryptr.encrypt(securityCode);

    const newCard: CreateCardData = {
        idUser,
        number,
        cardholderName,
        securityCode: encryptedSecurityCode,
        expirationDate,
        password: encryptedPassword,
        title,
        type,
        isVirtual
    };

    await cardsRepository.addNewCard(newCard);
};

async function getCardsByUserId(idUser: number){
    const result = await cardsRepository.findByUserId(idUser);

    if (result.length === 0){
        return errorResponses.notFound("cards for this user");
    };

    const cryptr = new Cryptr(process.env.CRYPTR_SECRET);
    for (let r in result){
        result[r].password = cryptr.decrypt(result[r].password);
        result[r].securityCode = cryptr.decrypt(result[r].securityCode);
    };

    return result;
};

async function getCardByIdAndUserId(id: number, idUser: number){
    const result = await cardsRepository.findByIdAndUserId(id, idUser);
    if (!result){
        return errorResponses.notFound("This card for this user was");
    };

    const cryptr = new Cryptr(process.env.CRYPTR_SECRET);
    result.password = cryptr.decrypt(result.password);
    result.securityCode = cryptr.decrypt(result.securityCode);

    return result;
};

async function deleteCard(id: number, idUser: number){
    const checkExists = await cardsRepository.findByIdAndUserId(id, idUser);
    if (!checkExists){
        return errorResponses.notFound("This card for this user was");
    }

    await cardsRepository.deleteById(id);
};


const cardsService = {
    createCard,
    getCardsByUserId,
    getCardByIdAndUserId,
    deleteCard
};

export default cardsService;