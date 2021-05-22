const jwt = require('jsonwebtoken')
require('dotenv').config()

const Users = require('../model/users')
const { HttpCode } = require('../helpers/constans')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const register = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await Users.findByEmail(email)
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        message: "Email in use",
      })
    }
    const newUser = await Users.create(req.body)
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        user: {
          email: newUser.email,
        },
      },
    })
  } catch (e) {
    next(e);
  }
}

const login = async (req, res, next) => {
  try {
    const {email, password} = req.body
    const user = await Users.findByEmail(email)
    const isValidPassword = await user?.ValidPassword(password)

    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        message: 'Email or password is wrong',
    })
  } 

  const id = user.id
  const payload = { id }
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' })
  await Users.updateToken(id, token)
  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: {
      token,
    },
  })
}
  catch(e) {
    next(e)
  }
};

const logout = async (req, res, next) => {
  const id = req.user?.id
  const user = await Users.getUserById(id)
  if (!user) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      message: 'Not authorized',
    })
  }
  await Users.updateToken(id, null)
  return res.status(HttpCode.NO_CONTENT).json({})
};

module.exports = {
  register,
  login,
  logout,
};
