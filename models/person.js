const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

// Variables from .env files only work in DEVELOPMENT mode
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
  },
  number: {
    // Use type string here so that minlength validator works.
    // If type Number is used, we cannot validate for at least 8 digits.
    // In built validators for Number only has min, not minlength
    type: String,
    minlength: 8,
    required: true
  },
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // _id in Mongoose objects looks like a string, but it is an object
    // It is converted here to a string just to be safe
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id // Delete _id property from the schema
    delete returnedObject.__v // Delete __v property from the schema
  },
})

module.exports = mongoose.model('Person', personSchema)
