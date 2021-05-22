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
      
    }
  } catch(e) {
    next(e)
  }
};

const logout = async (req, res, next) => {};

module.exports = {
  register,
  login,
  logout,
};
