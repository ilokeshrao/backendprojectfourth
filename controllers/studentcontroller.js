const student= require('../model/student')

exports.studentform= (req,res)=>{
    let loginname= req.session.loginname
    res.render('studentform.ejs',{loginname})
   }
   exports.studentinsert= (req,res)=>{
    const filename= req.file.filename
     const{sname,sclass,srollno,smark}=(req.body)
      const record= new Student({ name: sname,  class: sclass, rollno: srollno, mark:smark,img:filename})
      record.save()
   }
   exports.studentselection=async(req,res)=>{
    const record= await Student.find()
    const loginname= req.session.loginname
   // console.log(record)
    res.render('studentdata.ejs',{record,loginname})
  }
  exports.studentdelete= async(req,res)=>{
    const id=req.params.abc
     await Student.findByIdAndDelete(id)
     res.redirect('/studentdata')
  }
  exports.studentupdateform= async(req,res)=>{
    const id = req.params.id
    const record =await Student.findById(id)
    res.render('studentdataupdate.ejs',{record})
  }
  exports.studentupdate= async(req,res) =>{
    const id =req.params.id
    const {sname,sclass,srollno,smark}=req.body
    await student.findByIdAndUpdate(id,{ name: sname,  class: sclass,  rollno: srollno,  mark: smark })
    res.redirect('/studentdata')
 }