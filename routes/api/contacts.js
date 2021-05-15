const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
} = require("../../model/index");
const validate = require("../../services/validation");

// @ GET /api/contacts
router.get("/", async (_req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.json({
      status: "Success",
      code: 200,
      message: "Contacts found",
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @ GET /api/contacts/:contactId
router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);

    if (contact) {
      return res.json({
        status: "Success",
        code: 200,
        message: "Contact found",
        data: {
          contact,
        },
      });
    }

    return res.status(404).json({
      status: "Error",
      code: 404,
      message: "Not Found",
    });
  } catch (error) {
    next(error);
  }
});

// @ POST /api/contacts
router.post("/", validate.createContact, async (req, res, next) => {
  try {
    const contact = await addContact(req.body);
    return res.status(201).json({
      status: "Success",
      code: 201,
      message: "Contact created",
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
});

// @ DELETE /api/contacts/:contactId
router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId);
    if (contact) {
      return res.json({
        status: "Success",
        code: 200,
        message: "Contact deleted",
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "Error",
        code: 404,
        message: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
});

// @ PUT /api/contacts/:contactId
router.put("/:contactId", validate.updateContact, async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body);
    if (contact) {
      return res
        .status(200)
        .json({
          status: "Success",
          code: 200,
          message: "Contact updated successfully",
          data: { contact },
        });
    }

    return res.status(404).json({
      status: "Error",
      code: 404,
      message: "Not Found",
    });
  } catch (error) {
    next(error);
  }
});

// @ PATCH /api/contacts/:contactId/favorite

router.patch(
  "/:contactId/favorite",
  validate.updateContactStatus,
  async (req, res, next) => {
    try {
      if (!req.body.favorite) {
        return res.status(400).json({
          status: "Error",
          code: 400,
          message: "missing field favorite",
        });
      }
      const contact = await updateContactStatus(req.params.contactId, req.body);
      if (contact) {
        return res.status(200).json({
          status: "Success",
          code: 200,
          message: "Contact updated successfully",
          data: {
            contact
          },
        });
      }

      return res.status(404).json({
        status: "Error",
        code: 404,
        message: "Not Found",
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
