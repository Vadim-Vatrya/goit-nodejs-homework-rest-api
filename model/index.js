const Contact = require('./db/contact')


const listContacts = async () => {
 const result = await Contact.find({})
 return result
};

const getContactById = async (contactId) => {
  const result = await Contact.findOne({ _id: contactId })
  return result
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter(
      ({ id }) => id.toString() !== contactId
    );

    if (contacts.length === filteredContacts.length) {
      return console.log(`Contact with id: ${contactId} is not found`);
    }

    await fs.writeFile(
      contactsPath,
      JSON.stringify(filteredContacts, null, 2),
      "utf-8"
    );
    return filteredContacts;
  } catch (err) {
    return console.log("Error:", err.message);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: shortid.generate(), ...body };
    const contactList = [...contacts, newContact];
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contactList, null, 2),
      "utf-8"
    );
    return newContact;
  } catch (err) {
    return console.log("Error:", err.message);
  }
};

// const updateContact = async (contactId, body) => {
//   try {
//     const contacts = await listContacts();
//     const contact = contacts.find(({ id }) => id.toString() === contactId);
//     const updatedContact = { ...contact, ...body };
//     const updatedContactList = contacts.map(({ object }) =>
//       object.id.toString() === contact.id ? updatedContact : object
//     );

//     await fs.writeFile(
//       contactsPath,
//       JSON.stringify(updatedContactList, null, 2),
//       "utf-8"
//     );
//     return updatedContactList;
//   } catch (err) {
//     return console.log("Error:", err.message);
//   }
// };

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts()
    const index = contacts.findIndex(({id}) => id.toString() === contactId)

     if (index === -1) 
     return

     contacts[index] = {...contacts[index], ...body}

     await fs.writeFile(
            contactsPath,
            JSON.stringify(updatedContactList, null, 2),
            "utf-8"
          )

    return contacts[index]
  } catch(err) {
    return console.log("Error:", err.message)
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
