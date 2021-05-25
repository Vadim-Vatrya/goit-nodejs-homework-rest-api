const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const boolParser = require('express-query-boolean')
const limiter = require('./helpers/limiter')

const usersRouter = require('./routes/api/users/users')
const contactsRouter = require('./routes/api/contacts/contacts')


const app = express()
const helmet = require('helmet')
const formatsLogger = app.get("env") === "development" ? "dev" : "short"

app.use(helmet())
app.use(limiter)
app.use(logger(formatsLogger))
app.use(cors())
app.use(boolParser())
app.use(express.json({ limit: 15000 }))

app.use('/api/users', usersRouter)
app.use('/api/contacts', contactsRouter)


app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({ message: err.message })
})


module.exports = app
