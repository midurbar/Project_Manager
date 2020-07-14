const { Usuarios, Tareas} = require("../models");
const moment = require("moment");

function dashboard(req, res){
    const usuarios= req.session.usuarios;

    Usuarios.findByPk(usuarios.id, {
        include: {model: Tareas, as: 'tareas'}
    })

    .then(usuarios => {
        const tareas = usuarios.tareas.map(tareas => {
            return {
                nombre: tareas.nombre,
                fec_ini: moment(tareas.fec_ini).format("DD/MM/YYYY"),
                fec_venc: tareas.fec_venc && moment(tareas.fec_venc).format("DD/MM/YYYY")
            }
        });
    
        res.render('dashboard', {usuarios, tareas})

    })

}


module.exports = {
    dashboard
}