const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')

const Record = require('../record')
const Category = require('../category')
const User = require('../user')

const CategorySeedData = require('./category.json').results
const userSeedData = require('./userSeed.json').results

db.once('open', async () => {
  const categories = await Category.find().lean()
  for (categoryObj of CategorySeedData) {
    categoryObj.categoryId = categories.find(category => category.name === categoryObj.name)._id
  }
 
  for (userObj of userSeedData) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(userObj.password, salt)
    const registeredUser = await User.create({
      name: userObj.name,
      email: userObj.email,
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
  }
  console.log('recordSeeder done.')
  process.exit()
})