const { Usuarios } = require("../models");
const md5 = require('md5');
const Roles = require("../models/roles");

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
        const usuario= req.session.usuarios
        if (usuario) {
            Roles.findOne({where: {id: usuario.roleId}})
            .then(roles => {
               if (roles.permisos.indexOf(permiso)!=-1) {
                    next()
               } else {
                   res.status(403).send("Permiso denegado")
               }
            })
        } else {
            res.redirect('/login')
        }
    }
}

module.exports = {
    login,
    controlAcceso
}