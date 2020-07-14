const { Usuarios, Tareas} = require("../models");

function dashboard(req, res){
    const usuarios= req.session.usuarios;
    Usuarios.findByPk(usuarios.id, {
        include: {model: Tareas, as: 'tareas'}
    })
    .then(usuarios => {
        const tareas = usuarios.tareas;
        res.render('dashboard', {usuarios, tareas})
    })
    
}


module.exports = {
    dashboard
}