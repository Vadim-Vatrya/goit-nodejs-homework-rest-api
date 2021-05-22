const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus
 } = require('../model/index')
const {HttpCode} = require('../helpers/constans')




const getAll = async (_req, res, next) => {
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
}

const getById =  async (req, res, next) => {
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
}


  const create = async (req, res, next) => {
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


 const remove = async (req, res, next) => {
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
}


  const update = async (req, res, next) => {
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



  const updateStatus = async (req, res, next) => {
    try {
      if (!req.body.favorite) {
        return res.status(HttpCode.BAD_REQUEST).json({
          status: 'error',
          code: HttpCode.BAD_REQUEST,
          message: 'missing field favorite',
        });
      }
      const contact = await updateContactStatus(
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
