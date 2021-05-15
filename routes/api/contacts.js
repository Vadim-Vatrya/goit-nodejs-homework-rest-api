const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
} = require("../../model/index")
const validate = require('../../services/validation')
const { HttpCode } = require('../../helpers/constans')

// @ GET /api/contacts
router.get("/", async (_req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.status(HttpCode.OK).json({
      status: "Success",
      code: HttpCode.OK,
      message: "Contacts found",
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
})

// @ GET /api/contacts/:contactId
router.get("/:contactId", validate.validateObjId, async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);

    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "Success",
        code: HttpCode.OK,
        message: "Contact found",
        data: {
          contact,
        },
      });
    }

    return res.status(HttpCode.NOT_FOUND).json({
      status: "Error",
      code: HttpCode.NOT_FOUND,
      message: "Not Found",
    });
  } catch (error) {
    next(error);
  }
})

// @ POST /api/contacts
router.post(
  "/",
  validate.validateObjId,
  validate.createContact,
  async (req, res, next) => {
    try {
      const contact = await addContact(req.body);
      return res.status(HttpCode.CREATED).json({
        status: "Success",
        code: HttpCode.CREATED,
        message: "Contact created",
        data: { contact },
      });
    } catch (error) {
      next(error);
    }
  }
)

// @ DELETE /api/contacts/:contactId
router.delete("/:contactId", validate.validateObjId, async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "Success",
        code: HttpCode.OK,
        message: "Contact deleted",
        data: {
          contact,
        },
      });
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: "Error",
        code: HttpCode.NOT_FOUND,
        message: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
})

// @ PUT /api/contacts/:contactId
router.put(
  "/:contactId",
  validate.validateObjId,
  validate.updateContact,
  async (req, res, next) => {
    try {
      const contact = await updateContact(req.params.contactId, req.body);
      if (contact) {
        return res.status(HttpCode.OK).json({
          status: "Success",
          code: HttpCode.OK,
          message: "Contact updated successfully",
          data: { contact },
        })
      }

      return res.status(HttpCode.NOT_FOUND).json({
        status: "Error",
        code: HttpCode.NOT_FOUND,
        message: "Not Found",
      });
    } catch (error) {
      next(error)
    }
  }
)

// @ PATCH /api/contacts/:contactId/favorite

router.patch(
  "/:contactId/favorite",
  validate.updateContactStatus,
  validate.validateObjId,
  async (req, res, next) => {
    try {
      if (!req.body.favorite) {
        return res.status(HttpCode.BAD_REQUEST).json({
          status: "Error",
          code: HttpCode.BAD_REQUEST,
          message: "missing field favorite",
        });
      }
      const contact = await updateContactStatus(req.params.contactId, req.body);
      if (contact) {
        return res.status(HttpCode.OK).json({
          status: "Success",
          code: HttpCode.OK,
          message: "Contact updated successfully",
          data: { contact },
        });
      }

      return res.status(HttpCode.NOT_FOUND).json({
        status: "Error",
        code: HttpCode.NOT_FOUND,
        message: "Not Found",
      });
    } catch (error) {
      next(error)
    }
  }
);

module.exports = router
