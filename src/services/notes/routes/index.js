import express from 'express';
import {
  createNote,
  getNoteById,
  editNoteById,
  deleteNoteById,
  getAllNotes
} from '../controller/note-controller.js';
import { notePayloadSchema, noteQuerySchema } from '../validator/schema.js';
import validate from '../../../middlewares/validate.js';
import validateQuery from '../../../middlewares/validateQuery.js';

const router = express.Router();

router.post('/notes', validate(notePayloadSchema), createNote);
router.get('/notes', validateQuery(noteQuerySchema), getAllNotes);
router.get('/notes/:id', getNoteById);
router.put('/notes/:id', editNoteById);
router.delete('/notes/:id', deleteNoteById);

export default router;
