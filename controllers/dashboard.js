const { Usuarios, Tareas} = require("../models");
const moment = require("moment");

/**
 *Esta funcion es un controlador de Express que se ebcarga de mostrar las
 *tareas asignadas a un usuario en concreto.
 *
 * @param {*} req Contiene los datos de la peticion, entre los cuales esta el 
 * ID del usuario
 * @param {*} res Respuesta a la peticion
 */

function dashboard(req, res){
    const usuarios= req.session.usuarios;

    Usuarios.findByPk(usuarios.id, {
        include: {model: Tareas, as: 'tareas'}
    })

    .then(usuarios => {
        const tareas = usuarios.tareas.map(tareas => {
            return {
                nombre: tareas.nombre,
                link: "/tareas/" + tareas.id,
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