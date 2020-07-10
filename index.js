require('dotenv').config()
const express = require('express')
require('./models')

const {login} = require('./controllers/autenticacion')

const app = express()

//view engine setup
app.set('views', './views')
app.set('view engine', 'ejs')

//Definicion de las rutas
app.get('/login', (req, res) => res.render('login'))
app.post('/login', login)

app.listen(3000)