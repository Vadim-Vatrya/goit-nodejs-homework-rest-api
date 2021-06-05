const Joi = require('joi')
const {HttpCode} = require('../../../helpers/constans')

const schemaUserReg = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua", "ru"] },
    })
    .required(),
    password: Joi.string().required(),
})

const schemaUserLogin = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua", "ru"] },
    })
    .required(),
    password: Joi.string().required(),
})

const schemaUpdate = Joi.object({
  subscription: Joi.any().valid('free', 'pro', 'premium').required(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next()
  } catch (err) {
    next({
      status: HttpCode.BAD_REQUEST,
      message: 'Ошибка от Joi или другой библиотеки валидации',
    });
  }
}

module.exports.validateUserReg = (req, _, next) => {
  return validate(schemaUserReg, req.body, next)
}

module.exports.validateUserLogin = (req, _, next) => {
  return validate(schemaUserLogin, req.body, next)
}

module.exports.validateUpdateUser = (req, _res, next) => {
  return validate(schemaUpdate, req.body, next)
}

