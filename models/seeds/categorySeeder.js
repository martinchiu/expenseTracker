const db = require('../../config/mongoose')

const Category = require('../category')
const CategorySeedData = require('./category.json').results

db.once('open', () => {
  return Promise.all(Array.from(
    CategorySeedData,
    (category) => Category.create({ name: category.name})
  ))
    .then(() => {
      console.log('categorySeeder done.')
      process.exit()
    })
})