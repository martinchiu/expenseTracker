const mongoose = require('mongoose')
const Record = require('../record') 
mongoose.connect('mongodb://localhost/expense-tracker')
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 10; i++) {
    Record.create({ 
      name: 'name-' + i,
      date: Date.now(),
      amount: i
     })
  }
  console.log('done')
  process.exit()
})