const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  recipeName: String,
  images,
  rating,
  category,
  description,
  source,
  sourceUrl,
  prepTime: Number,
  cookTime: Number,
  totalTime: Number,
  servings: Number,
  difficulty: String,
  method,
  ingredients,
  notes,
  nutrition
})

module.exports = mongoose.model('Recipe', recipeSchema)