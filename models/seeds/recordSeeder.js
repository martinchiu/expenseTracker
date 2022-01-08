const db = require('../../config/mongoose')

const Record = require('../record')
const Category = require('../category')
const category = require('../category')
const record = require('../record')

const CATEGORY = require('./category.json').results

db.once('open', () => {
  // 新增 record 種子資料
  Promise.all(Array.from(
    CATEGORY,
    (value, index) => {
      Record.create({
        name: 'name-' + index,
        date: Date.now(),
        amount: index,
        category: value.name
      })
    }
  ))
  return Category.find()
  .lean()
  .then(categories => {
    // 讓 record 種子資料跟 category 種子資料關聯
    Promise.all(Array.from(
      categories,
      (value) => {
        Record.findOne({ category: value.name })
          .then(record => {
            record.categoryId = value._id
            record.save()
          })
      }
    ))
      .then(() => {
        console.log('recordSeeder done.')
      })  
  })
})