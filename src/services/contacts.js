import { ContactsCollection } from "../db/models/contact.js";

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.find(contactId);
  return contact;
};