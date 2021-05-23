const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus
 } = require('../model/index')
const {HttpCode} = require('../helpers/constans')



// @ GET /api/contacts
const getAll = async (req, res, next) => {
  try {
    // console.log(req.user)
    const userId = req.user.id
    const contacts = await listContacts(userId);
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
}

// @ GET /api/contacts/:contactId
const getById =  async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await getContactById(userId, req.params.contactId);

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
}

// @ POST /api/contacts
  const create = async (req, res, next) => {
    try {
      const userId = req.user.id
      const contact = await addContact({
        ...req.body,
        owner: userId,
    })
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

// @ DELETE /api/contacts/:contactId
 const remove = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await removeContact(userId, req.params.contactId);
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
}


// @ PATCH /api/contacts/:contactId
  const update = async (req, res, next) => {
    try {
      const userId = req.user.id
      const contact = await updateContact(userId, req.params.contactId, req.body);
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



  const updateStatus = async (req, res, next) => {
    try {
      const userId = req.user.id
      if (!req.body.favorite) {
        return res.status(HttpCode.BAD_REQUEST).json({
          status: 'error',
          code: HttpCode.BAD_REQUEST,
          message: 'missing field favorite',
        });
      }
      const contact = await updateContactStatus(
        userId,
        req.params.contactId,
        req.body,
      );
      if (contact) {
        return res
          .status(HttpCode.OK)
          .json({ status: 'success', code: HttpCode.OK, data: { contact } });
      }

      return res
        .status(HttpCode.NOT_FOUND)
        .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' });
    } catch (error) {
      next(error);
    }
  }



module.exports ={
  getAll,
  create,
  remove,
  getById,
  update,
  updateStatus,
}
