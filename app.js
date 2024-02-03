const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: false }))
const mongoose = require('mongoose')
const session = require('express-session')
mongoose.connect('mongodb://127.0.0.1:27017/backendproject')
const websitefronted = require('./routers/websitefronted')

app.use(session({
    secret:'lokesh',
    resave:false,
    saveUninitialized:false
}))
app.use(websitefronted)
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.listen(5000)