const recipeRouter = require('express').Router()
const Recipe = require('../models/recipe')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const recipeScraper = require('recipe-scraper')

recipeRouter.post('/', async (request, response) => {
  const body = request.body.user
  
  const user = await User.findOne({ email: body.email }).populate('recipes')
  response.status(200).send(user.recipes)
})

recipeRouter.post('/scrape', async (request, response) => {
  const url = request.body.recipeUrl

  let recipe = await recipeScraper(url)

  response.send(recipe)
})

recipeRouter.post('/add', async (request, response) => {
  const recipe = request.body.recipe

  const ingredients = recipe.ingredients.filter(ingredient => !!ingredient)
  const instructions = recipe.instructions.filter(instruction => !!instruction)

  recipe.ingredients = ingredients
  recipe.instructions = instructions

  //console.log(request.token)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'Token missing or invalid'})
  }

  const user = await User.findById(decodedToken.id)

  const recipeToSave = new Recipe({
    ...recipe,
    user: user._id
  })

  await recipeToSave.save()
  const savedRecipe = await Recipe.findOne({ name: recipe.name }).populate('user', { email: 1, username: 1, id: 1 })
  user.recipes = user.recipes.concat(savedRecipe._id)
  await user.save()

  response.status(201).json(savedRecipe)
})

module.exports = recipeRouter