const mongoose = require('mongoose')
const{ Schema } = mongoose
const bcrypt = require('bcryptjs')
const SALE_FACTOR = 6

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate(value) {
      const re = /\S+@\S+\.\S+/
      return re.test(String(value).toLocaleLowerCase())
    }
  },

  password: {
    type: String,
    required: [true, 'Password is required'],

  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
},
{
  versionKey: false,
  timestamps: true,
})

userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(SALE_FACTOR)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const user = mongoose.model('contact', userSchema)

module.exports = user