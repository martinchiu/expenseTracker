const db = require('../../config/mongoose')

const Category = require('../category')
const CATEGORY = require('./category.json').results

db.once('open', () => {
  return Promise.all(Array.from(
    CATEGORY, 
    (value) => Category.create({ name: value.name})
  ))
    .then(() => {
      console.log('categorySeeder done.')
      process.exit()
    })
})