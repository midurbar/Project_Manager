const { Usuarios } = require("../models");

function login(req,res) {
    const {email, password} = req.body;

    Usuarios.findOne({where: {email, password}})
    .then(usuarios => {
        if (usuarios) {
            req.session.usuarios = usuarios;
            res.redirect('/');
        } else {
            res.render('login');
        }
    })
    
}

module.exports = {
    login
}