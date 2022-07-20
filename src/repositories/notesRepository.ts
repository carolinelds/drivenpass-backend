import prisma from "./../config/database.js";
import { CreateSecureNoteData } from "../services/notesService.js";

async function findByTitleAndUserId(title: string, idUser: number){
    const note = await prisma.secureNotes.findMany({
        where: {
            idUser,
            title
        }
    });

    return note;
};

async function addNewNote(newNote: CreateSecureNoteData){
    await prisma.secureNotes.create({
        data: newNote
    });
};

async function findByUserId(idUser: number){
    const result = await prisma.secureNotes.findMany({
        where: {
            idUser
        }
    });
    return result;
};

async function findByIdAndUserId(id: number, idUser: number){
    const result = await prisma.secureNotes.findFirst({
        where: {
            id,
            idUser
        }
    });
    return result;
};

async function deleteById(id: number){
    await prisma.secureNotes.delete({
        where: {
            id
        }
    });
};

const notesRepository = {
    findByTitleAndUserId,
    addNewNote,
    findByUserId,
    findByIdAndUserId,
    deleteById
};

export default notesRepository;