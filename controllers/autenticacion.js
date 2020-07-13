const { Usuarios } = require("../models");
const md5 = require('md5');

function login(req,res) {
    const {email, password} = req.body;

    Usuarios.findOne({where: {email, password: md5(password)}})
    .then(usuarios => {
        if (usuarios) {
            req.session.usuarios = usuarios;
            res.redirect('/');
        } else {
            res.render('login',{mensaje: "Usuario o contraseña incorrectos."});
        }
    })
    
}

function controlAcceso (permiso) {
    return function (req, res, next) {
        if (req.session.usuarios) {
            next()
        } else {
            res.redirect('/login')
        }
    }
}

module.exports = {
    login,
    controlAcceso
}