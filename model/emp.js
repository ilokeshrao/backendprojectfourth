 const mongoose= require('mongoose')

  const empschema=mongoose.Schema({
    name: String,
    age : Number,
    email:String
  })


    module.exports=mongoose.model('emp',empschema)