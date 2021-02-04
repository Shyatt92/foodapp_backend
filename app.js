const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')

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

  module.exports = app