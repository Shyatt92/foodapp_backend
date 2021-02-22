const express = require('express')
require('express-async-errors')
const app = express()
const signUpRouter = require('./controllers/signup')
const loginRouter = require('./controllers/login')
const recipeRouter = require('./controllers/recipes')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

logger.info('Connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, config.mongoOptions)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch(error => {
    logger.error('Error connecting to MongoDB', error.message)
  })

  app.use(cors())
  app.use(express.json())
  app.use(middleware.requestLogger)
  app.use(middleware.tokenExtractor)

  app.use('/signup', signUpRouter)
  app.use('/login', loginRouter)
  app.use('/recipe', recipeRouter)

  module.exports = app