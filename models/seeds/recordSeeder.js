const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')

const Record = require('../record')
const Category = require('../category')
const User = require('../user')

const CATEGORY = require('./category.json').results
const userSeedData = require('./userSeed.json').results

db.once('open', () => {
  Category.find()
    .lean()
    .then(categories => {
      return Promise.all(Array.from(
        CATEGORY,
        (value) => {
          value.categoryId = categories.find(category => category.name === value.name)._id
        }
      ))
    })
  Promise.all(Array.from(
    userSeedData,
    (user) => {
     return bcrypt.genSalt(10)
      .then(salt => { return bcrypt.hash(user.password, salt) })
      .then(hash => {
        return User.create({
          name: user.name,
          email: user.email,
          password: hash
        })
      })
      .then(registeredUser => {
        const userId = registeredUser._id
        return Promise.all(Array.from(
          CATEGORY,
          (value, index) => {
            return Record.create({
              name: 'name-' + index,
              date: Date.now(),
              amount: index,
              category: value.name,
              categoryId: value.categoryId,
              userId
            })
          }
        ))
      })
  }))
    .then(() => {
      console.log('recordSeeder done.')
      process.exit()
    })
})