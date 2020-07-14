require('dotenv').config()
const express = require('express')
const cookieParser= require('cookie-parser')
const cookieSession= require('cookie-session')
require('./models')

const {login, controlAcceso} = require('./controllers/autenticacion')
const {dashboard} = require('./controllers/dashboard')

const app = express()

app.use(express.urlencoded({extended: false}))

app.use(cookieParser())
app.use(cookieSession({
    name: 'campurriana',
    keys: [process.env.KEY1, process.env.KEY2],
    maxAge: process.env.DURACION_COOKIE * 6 * 1000
}))

//view engine setup
app.set('views', './views')
app.set('view engine', 'ejs')

//Definicion de las rutas
app.get('/', controlAcceso("leer-tareas-asignadas"), dashboard)
app.get('/login', (req, res) => res.render('login'))
app.post('/login', login)

app.listen(3000)