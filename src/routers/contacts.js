import { Router } from "express";
import { createContactsController, deleteContactController, getContactsByIdController, getContactsController, patchContactController } from "../controllers/contacts";
import { ctrlWrapper } from "../utils/ctrlWrapper";

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactsByIdController));

router.post('/contacts', ctrlWrapper(createContactsController));

router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;