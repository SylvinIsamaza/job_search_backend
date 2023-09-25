const mongoose = require('mongoose')

const db = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/job_search").then(() => {
    console.log('connected to the database')
  }).catch(err => {
    console.log(err)
  })
}

module.exports=db