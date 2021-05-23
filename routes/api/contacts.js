const express = require('express')
const router = express.Router()

const contactsControllers = require('../../controllers/contacts')
const validate = require('../../services/validation')
const guard = require('../../helpers/guard')


router
  .get('/', guard, contactsControllers.getAll)
  .post('/', guard, validate.validateObjId, validate.createContact, contactsControllers.create)

router
  .get('/:contactId', guard, validate.validateObjId, contactsControllers.getById)
  .delete('/:contactId', guard, validate.validateObjId, contactsControllers.remove)
  .patch('/:contactId', guard, validate.validateObjId, validate.updateContact, contactsControllers.update)

router
.patch('/:contactId/favorite', guard, validate.validateObjId, validate.updateContactStatus, contactsControllers.updateStatus)

module.exports = router;
