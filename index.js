require('dotenv').config()
const express = require('express')
const cookieParser= require('cookie-parser')
const cookieSession= require('cookie-session')
require('./models')

const {login, controlAcceso} = require('./controllers/autenticacion')
const {dashboard} = require('./controllers/dashboard')
const {mostrarTarea, registrarAccionTarea} = require('./controllers/tareas')
const {crearProyecto, listarProyectos, leerProyecto, modificarProyecto, eliminarProyecto} = require('./api/proyectos')
const {crearTarea, listarTareas, leerTarea, modificarTarea, eliminarTarea} = require('./api/tareas')

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

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

/*app.get('/tareas/:id', mostrarTarea)
app.post('/tareas/:id', registrarAccionTarea)*/

app.post('/api/proyectos',crearProyecto)
app.get('/api/proyectos',listarProyectos)
app.get('/api/proyectos/:id',leerProyecto)
app.put('/api/proyectos/:id',modificarProyecto)
app.delete('/api/proyectos/:id',eliminarProyecto)

app.post('/api/tareas',crearTarea)
app.get('/api/tareas',listarTareas)
app.get('/api/tareas/:id',leerTarea)
app.put('/api/tareas/:id',modificarTarea)
app.delete('/api/tareas/:id',eliminarTarea)

app.listen(3000)