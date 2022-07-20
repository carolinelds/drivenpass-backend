import prisma from "./../config/database.js";
import { CreateCardData } from "../services/cardsService.js";

async function findByTitleAndUserId(title: string, idUser: number){
    const card = await prisma.cards.findMany({
        where: {
            idUser,
            title
        }
    });

    return card;
};

async function addNewCard(newCard: CreateCardData){
    await prisma.cards.create({
        data: newCard
    });
};

async function findByUserId(idUser: number){
    const result = await prisma.cards.findMany({
        where: {
            idUser
        }
    });
    return result;
};

async function findByIdAndUserId(id: number, idUser: number){
    const result = await prisma.cards.findFirst({
        where: {
            id,
            idUser
        }
    });
    return result;
};

async function deleteById(id: number){
    await prisma.cards.delete({
        where: {
            id
        }
    });
};

const cardsRepository = {
    findByTitleAndUserId,
    addNewCard,
    findByUserId,
    findByIdAndUserId,
    deleteById
};

export default cardsRepository;