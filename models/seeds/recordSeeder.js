const db = require('../../config/mongoose')

const Record = require('../record')

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
})