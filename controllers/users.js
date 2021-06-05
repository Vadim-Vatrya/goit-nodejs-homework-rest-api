const jwt = require('jsonwebtoken')
require('dotenv').config()

const Users = require('../model/users')
const { HttpCode } = require('../helpers/constans')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

// /register
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
          // id: newUser.id,
          email: newUser.email,
          subscription: newUser.subscription,
          avatar: newUser.avatar,
        },
      },
    })
  } catch (e) {
    next(e);
  }
}

// /login
const login = async (req, res, next) => {
  try {
    const {email, password} = req.body
    const user = await Users.findByEmail(email)
    const isValidPassword = await user?.validPassword(password)

    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        message: 'Email or password is wrong',
    })
  } 

  const payload = { id: user.id }
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '6h' })
  await Users.updateToken(user.id, token)
  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  })
}
  catch(e) {
    next(e)
  }
};

// /logout
const logout = async (req, res, next) => {
  try {
    await Users.updateToken(req.user.id)
    return res.status(HttpCode.NO_CONTENT).json({
      status: "success",
      code: HttpCode.NO_CONTENT,
    })
  } catch(e) {
    next(e)
  }
}


// /current
const current = async (req, res, next) => {
  try {
      const userId = req.user.id
      const currentUser = await Users.findById(userId)

      if (currentUser) {
          return res.status(HttpCode.OK).json({
              status: 'success',
              code: HttpCode.OK,
              data: {
                  email: currentUser.email,
                  subscription: currentUser.subscription,
              },
          })
      } else {
          return res.status(HttpCode.UNAUTHORIZED).json({
              status: 'error',
              code: HttpCode.UNAUTHORIZED,
              data: 'Unauthorized',
              message: 'Not authorized',
          })
      }
  } catch (e) {
      next(e)
  }
}


// /update/subscription

const updateSuscription = async (req, res, next) => {
  const userId = req.user.id
  try{
    await Users.updateSuscriptionUser(userId, req.body.subscription)
    const user = await Users.findById(userId)
    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    })
  } catch(error) {
    next(error)
  }
}


module.exports = {
  register,
  login,
  logout,
  current,
  updateSuscription,
}
