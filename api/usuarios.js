const { Usuarios } = require("../models")


function crearUsuario (req, res) {
    Usuarios.create(req.body)
    .then(nuevoUsuario => {
        res.status(201).json(nuevoUsuario)
    })
    .catch(err => {
        res.status(400).json(err)
    })
}

function listarUsuarios (req, res) {
    Usuarios.findAll()
    .then (usuarios => {
        res.status(200).json(usuarios)
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

function leerUsuario(req, res) {
    Usuarios.findByPk(req.params.id)
    .then(usuarios => { 
       if (usuarios) { 
           res.status(200).json(usuarios)
        } else {
           res.status(404).json("Usuario no encontrado")
        }
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

function modificarUsuario(req, res) {
    Usuarios.findByPk(req.params.id)
    .then( usuarios => {
        if (usuarios) { 
            Object.assign(usuarios, req.body)
            usuarios.save()
            .then(usuarios => {
                res.status(200).json(usuarios)
            })
         } else {
            res.status(404).json("Usuario no encontrado")
         }
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

function eliminarUsuario(req, res) {
    Usuarios.findByPk(req.params.id)
    .then(usuarios => {
        if (usuarios) {
            usuarios.destroy()
            .then(() => {
                res.status(200).json({})
            })
        } else {
            res.status(404).json("Usuario no encontrado")
        }
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

module.exports ={
    crearUsuario,
    listarUsuarios,
    leerUsuario,
    modificarUsuario,
    eliminarUsuario
}