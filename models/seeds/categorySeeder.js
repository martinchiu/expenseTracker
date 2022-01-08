const db = require('../../config/mongoose')

const Category = require('../category')
const CATEGORY = ["家居物業", "交通出行", "休閒娛樂", "餐飲食品", "其他"]

db.once('open', () => {
  return Promise.all(Array.from(
    CATEGORY, 
    (value) => Category.create({ name: value})
  ))
    .then(() => {
      console.log('categorySeeder done.')
      process.exit()
    })
})