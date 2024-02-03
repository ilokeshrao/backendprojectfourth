 const mongoose= require('mongoose')

      const studentschema= mongoose.Schema({
        name: String,
        class:String,
        rollno: String,
        mark: Number,
        img:String
     })



   module.exports= mongoose.model('student',studentschema)