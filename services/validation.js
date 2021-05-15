const Joi = require("joi")
Joi.objectId = require("joi-objectid")(Joi)
const { HttpCode } = require('../helpers/constans')

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua", "ru"] },
    })
    .required(),
  favorite: Joi.boolean().required(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  phone: Joi.string().optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua", "ru"] },
    })
    .optional(),
  favorite: Joi.boolean().optional(),
})

const schemaUpdateContactStatus = Joi.object({
  favotite: Joi.boolean().required(),
})

const schemaValidateId = Joi.object({
  id: Joi.objectId().required(),
})

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);

  if (error) {
    const [{ message }] = error.details;
    return next({
      status: HttpCode.BAD_REQUEST,
      message: `Filed: ${message.replace(/"/g, "")}`,
      data: "Bad Request",
    });
  }
  next();
}

module.exports.createContact = (req, _res, next) => {
  return validate(schemaCreateContact, req.body, next);
}

module.exports.updateContact = (req, _res, next) => {
  return validate(schemaUpdateContact, req.body, next);
}

module.exports.updateContactStatus = (req, _res, next) => {
  return validate(schemaUpdateContactStatus, req.body, next);
}

module.exports.validateObjId = (req, _res, next) => {
  return validate(schemaValidateId, {id: req.params.contactId}, next);
}