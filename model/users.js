const User = require('./schemas/user')

const findById = async (id) => {
  return await User.findOne({ _id: id })
}

const findByEmail = async (email) => {
  return await User.findOne({ email })
}

const create = async ({ email, password, subscription }) => {
  const user = new User({ email, password, subscription })
  return user.save()
}

const updateToken = async (id, token) => {
  return User.updateOne({ _id: id, }, { token })
}

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
}