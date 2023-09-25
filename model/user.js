const mongoose = require('mongoose')

const User = new mongoose.Schema({
  full_name: {
    type:String,
  
  },
  email: {
    type: String,
    required: true,
    unique:true
    
  },
  username: {
    type: String,
    required: true,
    unique:true,
  },
  password: {
    type: String,
    required: true
  },
  skills: [
   {
      type: String,
     
    }
  ],
  profileImg: {
    type: String
  },
  socialMedia: {
    twitter: {
      type:String
    },
    facebook: {
      type:String
    },
    instagram: {
      type:String
    }
  },
  address: {
    type:String
  }

}, { timestamps: true })


module.exports=mongoose.model('user',User)