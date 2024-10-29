import { Router } from "express";
import { createContactsController, deleteContactController, getContactsByIdController, getContactsController, patchContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValidId } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";
import { contactSchema } from "../validation/contacts.js";

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactsByIdController));

router.post('/contacts', validateBody(contactSchema), ctrlWrapper(createContactsController));

router.patch('/contacts/:contactId', validateBody(contactSchema), isValidId, ctrlWrapper(patchContactController));

router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;