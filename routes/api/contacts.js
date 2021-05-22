const express = require('express');
const router = express.Router();

const contactsControllers = require('../../controllers/contacts');
const validate = require('../../services/validation');


router
  .get('/', contactsControllers.getAll)
  .post('/', validate.validateObjId, validate.createContact, contactsControllers.create)

router
  .get('/:contactId', validate.validateObjId, contactsControllers.getById)
  .delete('/:contactId', validate.validateObjId, contactsControllers.remove)
  .patch('/:contactId', validate.validateObjId, validate.updateContact, contactsControllers.update)

router
.patch('/:contactId/', validate.validateObjId, validate.updateContactStatus, contactsControllers.update)

module.exports = router;
