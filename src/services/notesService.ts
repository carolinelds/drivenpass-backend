import "./../setup.js";
import { SecureNotes } from "@prisma/client";
import errorResponses from "./../responses/errorResponses.js";
import notesRepository from "./../repositories/notesRepository.js";

export type CreateSecureNoteData = Omit<SecureNotes, "id">;

async function createNote(idUser: number, title: string, text: string){

    const checkTitle = await notesRepository.findByTitleAndUserId(title, idUser);
    if (checkTitle.length > 0){
        return errorResponses.conflict("Title");
    };

    const newNote: CreateSecureNoteData = {
        idUser,
        title,
        text
    };

    await notesRepository.addNewNote(newNote);
};

async function getNotesByUserId(idUser: number){
    const result = await notesRepository.findByUserId(idUser);

    if (result.length === 0){
        return errorResponses.notFound("secure notes for this user");
    };

    return result;
};

async function getNoteByIdAndUserId(id: number, idUser: number){
    const result = await notesRepository.findByIdAndUserId(id, idUser);
    if (!result){
        return errorResponses.notFound("This secure note for this user was");
    };

    return result;
};

async function deleteNote(id: number, idUser: number){
    const checkExists = await notesRepository.findByIdAndUserId(id, idUser);
    if (!checkExists){
        return errorResponses.notFound("This note for this user was");
    }

    await notesRepository.deleteById(id);
};


const notesService = {
    createNote,
    getNotesByUserId,
    getNoteByIdAndUserId,
    deleteNote
};

export default notesService;