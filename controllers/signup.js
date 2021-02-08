const bcrypt = require('bcrypt')
const signUpRouter = require('express').Router()
const User = require('../models/user')

signUpRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.username.length < 3 || body.password.length < 3) {
    return response.status(400).json({ error: 'Invalid username or password'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    firstName: body.firstName,
    surname: body.surname,
    email: body.signUpEmail,
    passwordHash
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

signUpRouter.get('/', async (request, response) => {
  const users = await User.find({})

  response.json(users)
})

//Temporary route handler to delete all users from api
signUpRouter.delete('/', async (request, response) => {
  await User.deleteMany({})
  console.log('Deleted all Users')
})

module.exports = signUpRouter