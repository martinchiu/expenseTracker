const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')

const Record = require('../record')
const Category = require('../category')
const User = require('../user')

const CategorySeedData = require('./category.json').results
const userSeedData = require('./userSeed.json').results

db.once('open', () => {
  Category.find()
    .lean()
    .then(categories => {
       Promise.all(Array.from(
         CategorySeedData,
        (value) => {
          value.categoryId = categories.find(category => category.name === value.name)._id
        }
      ))
    })
  Promise.all(userSeedData.map(async (user) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    const registeredUser = await User.create({
      name: user.name,
      email: user.email,
      password: hash
    })
    const userId = registeredUser._id
    await Promise.all(CategorySeedData.map((category, category_index) => {
      return Record.create({
        name: 'name-' + category_index,
        date: Date.now(),
        amount: category_index,
        category: category.name,
        categoryId: category.categoryId,
        userId
      })
    }))

    console.log('recordSeeder done.')
    process.exit()
  }))
})