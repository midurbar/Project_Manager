const { Tareas, Intervencion, Usuarios } = require("../models");
const moment = require("moment");

function mostrarTarea(req, res) {
    const id = req.params.id;
    Tareas.findByPk(id, {include: ['intervenciones']})
    .then(tareas => {
        res.render('tareas', {
            tareas: {
                link: "/tareas/" + tareas.id,
                estado: tareas.fec_fin? "Finalizado" : "Pendiente",
                intervenciones: tareas.intervenciones,
                iniciada: tareas.intervenciones.some(x => x.fin==null),
                fec_ini: moment(tareas.fec_ini).format("DD/MM/YYYY"),
                fec_fin: tareas.fec_fin && moment(tareas.fec_fin).format("DD/MM/YYYY"),
                fec_venc: tareas.fec_venc && moment(tareas.fec_venc).format("DD/MM/YYYY")  
            }
        })
    })
}


function registrarAccionTarea(req, res) {
    const id = req.params.id
    const {accion} = req.body

    Tareas.findByPk(id, {include: [Usuarios]})
    .then(async tarea => {
        const usuarios = await Usuarios.findByPk(req.session.usuarios.id)

        if (accion == "start") {
            await Intervencion.create({usuarioId: usuarios.id, tareaId: tareas.id, inicio: new Date()})
        }  else if (accion == "stop") {
            const intervencion = await Intervencion.findOne({
                where:{usuarioId: usuarios.id, tareaId: tareas.id, fin: null}
            })
            intervencion.fin = new Date()
            await intervencion.save()
        } else if (accion == "terminar") {
            const intervencion = await Intervencion.findOne({
                where:{usuarioId: usuarios.id, tareaId: tareas.id, fin: null}
            })
            if (intervencion) {
                intervencion.fin = new Date()
                await intervencion.save()
            }
            tareas.fechaFin = new Date()
        }

        return await tareas.save()
    })
    .then(() => {
        res.redirect("/tareas/" + id)
    })
    .catch(err => {
        console.error(err);
        res.status(400).send(err.message)
    })
}

module.exports = {
    mostrarTarea,
    registrarAccionTarea
}