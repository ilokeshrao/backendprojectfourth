const router =require('express').Router()
//const Emp = require('../model/emp')
const Emp = require('../model/emp')
const student = require('../model/student')
const Student = require('../model/student')
  const Reg = require('../model/reg')
  const bcrypt=require('bcrypt')
  const multer= require('multer')
   const nodemailer= require('nodemailer')
 const studentc= require('../controllers/studentcontroller')
  let storage=  multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,'./public/upload')
    },
    filename:function(req,file,cb){
      cb(null,Date.now()+file.originalname)
    }
  })
  let upload= multer({
    storage:storage,
    limits:{
      fileSize:1024*1024*4
    }
  })


  function handlelogin(req,res,next){
    if(req.session.isAuth){
      next()
    }else{
      res.redirect('/login')
    }
  }
  


router.get('/',(req,res)=>{
    //res.send("Hello World")
    res.render('index.ejs')
  })
 router.get('/about',(req,res)=>{
    res.send('jai shree ram')
  res.render('about.ejs')
  }) 
//  router.post('/about', (req, res)=>{
 //const{ename,age,email}=req.body
  //})

  router.get('/contact',(req,res)=>{
    res.render('contact.ejs')
  })

  router.get('/home1',handlelogin,(req,res)=>{
    const loginname= req.session.loginname
    res.render('home1.ejs',{loginname})

  })
 router.get('/studentform',studentc.studentform)
 router.post('/studentform',upload.single('img'),studentc.studentinsert)
  router.get('/studentdata',handlelogin, studentc.studentselection)
    router.get('/studentdelete/:abc',studentc.studentdelete)
    router.get('/studentupdate/:id',studentc.studentupdateform)
    router.post('/studentupdate/:id', studentc.studentupdate)
     router.get('/login',(req,res)=>{
      let loginname=req.session.loginname
    res.render('login.ejs',{loginname})
   })
   router.get('/createaccount',(req,res)=>{
    res.render('signup.ejs')
   })
    router.post('/createaccount',async(req,res)=>{
      const{name,password}=req.body
      const usercheck= await Reg.findOne({username:name})
     // console.log(usercheck)
     if(usercheck==null){
     const convertedpass= await bcrypt.hash(password,10)
    // console.log(convertedpass)
      const record=new Reg({username:name,password:convertedpass})
      record.save()
    // console.log(record)
    }else{res.send('username is already register with us')}
    })
   router.post('/login',async(req,res)=>{
    const{name,password}=req.body
    const record= await Reg.findOne({username:name})
    if(record!==null){
     const passwordcompare=  await bcrypt.compare(password,record.password)
      if(passwordcompare){
        req.session.isAuth= true //trigger
        req.session.loginname= name
        res.redirect('/home1')
      }else{
        res.send('wrong password')
      }
    }else{
      res.send('wrong username ')
    }
   })
  router.get('/logout',(req,res)=>{
   req.session.destroy()
   res.redirect('/login')
  })
  router.get('/emailsend',async(req,res)=>{
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: 'lkyadav2311@gmail.com',
        pass:'xlnunxbteckodvwo'
      }
    });
    console.log('connect to gmail here!!!!')
    const info = await transporter.sendMail({
      from: 'lkyadav2311@gmail.com', // sender address
      to: "lkyadav2311@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "welcome to my backend project", // plain text body
     html: '<a href="http://google.co.in">Google page</a>',// html body
     attachments:[{
      path:'./public/upload/lokeshpic.jpeg'
     }]
    });
  console.log('email send')

  })

    module.exports=router