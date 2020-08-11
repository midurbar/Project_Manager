const { Roles } = require("../models")


function crearRol (req, res) {
    Roles.create(req.body)
    .then(nuevoRol => {
        res.status(201).json(nuevoRol)
    })
    .catch(err => {
        res.status(400).json(err)
    })
}

function listarRoles (req, res) {
    Roles.findAll()
    .then (roles => {
        res.status(200).json(roles)
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

function leerRol(req, res) {
    Roles.findByPk(req.params.id)
    .then(roles => { 
       if (roles) { 
           res.status(200).json(roles)
        } else {
           res.status(404).json("Rol no encontrado")
        }
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

function modificarRol(req, res) {
    Roles.findByPk(req.params.id)
    .then( roles => {
        if (roles) { 
            Object.assign(roles, req.body)
            roles.save()
            .then(roles => {
                res.status(200).json(roles)
            })
         } else {
            res.status(404).json("Rol no encontrado")
         }
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

function eliminarRol(req, res) {
    Roles.findByPk(req.params.id)
    .then(roles => {
        if (roles) {
            roles.destroy()
            .then(() => {
                res.status(200).json({})
            })
        } else {
            res.status(404).json("Rol no encontrado")
        }
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

module.exports ={
    crearRol,
    listarRoles,
    leerRol,
    modificarRol,
    eliminarRol
}