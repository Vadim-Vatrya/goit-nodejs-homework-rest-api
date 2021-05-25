const express = require('express')
const router = express.Router()
const contactsControllers = require('../../../controllers/contacts')
const validate = require('./validation')
const guard = require('../../../helpers/guard')



router.get('/', guard, contactsControllers.getAll)
router.post('/', guard,  validate.createContact, contactsControllers.create)

router.get('/:contactId', guard,  contactsControllers.getById)
router.delete('/:contactId', guard,  contactsControllers.remove)
router.put('/:contactId', guard,  validate.updateContact, contactsControllers.update)

router.patch('/:contactId/favorite', guard,  validate.updateContactStatus, contactsControllers.update)

module.exports = router
