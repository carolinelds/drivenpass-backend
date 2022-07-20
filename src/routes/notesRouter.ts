import { Router } from "express";
import { validateToken } from "../middlewares/authMiddleware.js";
import validSchema from "./../middlewares/validateSchema.js";
import notesSchema from "../schemas/notesSchema.js";
import { createNote, getNotes, deleteNote } from "./../controllers/notesController.js";

const notesRouter = Router();

notesRouter.post("/notes",
    validateToken,
    validSchema(notesSchema, "Input data"),
    createNote
);

notesRouter.get("/notes",
    validateToken,
    getNotes
);

notesRouter.delete("/notes/:id",
    validateToken,
    deleteNote
);

export default notesRouter;