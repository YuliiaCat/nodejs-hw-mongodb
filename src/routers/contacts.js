import { Router } from "express";
import { createContactsController, deleteContactController, getContactsByIdController, getContactsController, patchContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValidId } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";
import { contactSchema } from "../validation/contacts.js";

const router = Router();

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', isValidId, ctrlWrapper(getContactsByIdController));

router.post('/', validateBody(contactSchema), ctrlWrapper(createContactsController));

router.patch('/:contactId', validateBody(contactSchema), isValidId, ctrlWrapper(patchContactController));

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;