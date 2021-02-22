const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: [String],
  instructions: [String],
  tags: [],
  time: {
    prep: String,
    cook: String,
    active: String,
    inactive: String,
    ready: String,
    total: String
  },
  servings: String,
  image: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Recipe', recipeSchema)