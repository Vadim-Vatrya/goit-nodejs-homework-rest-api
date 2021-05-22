const mongoose = require('mongoose')
const{ Schema,  SchemaTypes } = mongoose

const ContactSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Set email for contact'],
    validate(value) {
      const re = /\S+@\S+\.\S+/
      return re.test(String(value).toLocaleLowerCase())
    }
  },
  phone: {
    type: String,
    unique: true,
    required: [true, 'Set phone for contact'],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
  },
}, {
  versionKey: false,
  timestamps: true,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
},)

const Contact = mongoose.model('contact', ContactSchema)
module.exports = Contact