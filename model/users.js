const User = require('./schemas/user')

const findById = async (id) => {
  return await User.findOne({ _id: id })
}

const findByEmail = async (email) => {
  return await User.findOne({ email })
}

const findUserByVerifyToken = async (token) => {
  return await User.findOne({ verifyToken: token });
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

const updateAvatar = async (id, avatar, userImgId) => {
  const body = { avatarURL: avatar, userImgId }
  const result = await User.findByIdAndUpdate(id, { ...body })
  return result
}

const updateVerifyToken = async ( id, verify, token ) => {
  return User.updateOne({ _id: id }, { verify, verifyToken: token })
}


// const updateAvatar = async (id, avatar, userIdImg = null) => {
//   return await User.updateOne({ _id: id }, { avatar, userIdImg })
// }

module.exports = {
  findById,
  findByEmail,
  findUserByVerifyToken,
  create,
  updateToken,
  updateSuscriptionUser,
  updateAvatar,
  updateVerifyToken,
}