const {Proyectos, Tareas} = require("../models")

function crearProyecto (req, res) {
    Proyectos.create(req.body)
    .then(nuevoProyecto => {
        res.status(201).json(nuevoProyecto)
    })
    .catch(err => {
        res.status(400).json(err)
    })
}

function listarProyectos (req, res) {
    Proyectos.findAll()
    .then (proyectos => {
        res.status(200).json(proyectos)
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

function leerProyecto(req, res) {
    Proyectos.findByPk(req.params.id, {include: ['participantes', Tareas]})
    .then(proyecto => { 
       if (proyecto) { 
           res.status(200).json(proyecto)
        } else {
           res.status(404).json("Proyecto no encontrado")
        }
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

function modificarProyecto(req, res) {
    Proyectos.findByPk(req.params.id)
    .then( proyecto => {
        if (proyecto) { 
            Object.assign(proyecto, req.body)
            proyecto.save()
            .then(proyecto => {
                res.status(200).json(proyecto)
            })
         } else {
            res.status(404).json("Proyecto no encontrado")
         }
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

function eliminarProyecto(req, res) {
    Proyectos.findByPk(req.params.id)
    .then(proyecto => {
        if (proyecto) {
            proyecto.destroy()
            .then(() => {
                res.status(200).json({})
            })
        } else {
            res.status(404).json("Proyecto no encontrado")
        }
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

module.exports ={
    crearProyecto,
    listarProyectos,
    leerProyecto,
    modificarProyecto,
    eliminarProyecto
}