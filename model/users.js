const User = require('./schemas/user')

const findById = async (id) => {
  return await User.findOne({ _id: id })
}

const findByEmail = async (email) => {
  return await User.findOne({ email })
}

const create = async ({ email, password, subscription }) => {
  const user = new User({ email, password, subscription })
  return await user.save()
}

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id, }, { token })
}

const updateSuscriptionUser = async (id, subscription) =>{
  return await User.updateOne({ _id: id, }, {subscription})
}

const updateAvatar = async (id, avatar, userIdImg = null) => {
  return await User.updateOne({ _id: id }, { avatar, userIdImg })
}

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  updateSuscriptionUser,
  updateAvatar,
}