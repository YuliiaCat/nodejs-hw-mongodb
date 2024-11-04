import createHttpError from 'http-errors';
import { createContact, deleteContact, getAllContacts, getContactById, updateContact } from '../services/contacts.js';
import mongoose from 'mongoose';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder} = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user.id,
  });

  res.json({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts,
  });
};

export const getContactsByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId, req.user.id);

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  if (contact.userId.toString() !== req.user.id.toString()) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactsController = async (req, res) => {
  const data = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    contactType: req.body.contactType,
    userId: req.user.id
  };

  const contact = await createContact(data);

  res.status(201).json({
		status: 201,
		message: "Successfully created a contact!",
		data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return next(createHttpError(400, 'Invalid contact ID format'));
  }
  
  const updatedContact = await updateContact(contactId, req.body, req.user.id);

  if (!updatedContact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  if (updatedContact.userId.toString() !== req.user.id.toString()) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.json({
    status: 200,
    message: "Successfully patched a contact!",
    data: updatedContact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId, req.user.id);

  if (contact === null) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  if (contact.userId.toString() !== req.user.id.toString()) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(204).send();
};
