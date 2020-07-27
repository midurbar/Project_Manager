const Sequelize = require('sequelize');
const sequelize =require ('./db');

/**
 * Modelo de tarea, con la informacion de la misma
 * 
 * Notese que la fecha de vencimiento puede ser nula, lo que simboliza que
 * la tarea no tiene por que tener fecha limite.
 */


const Tareas = sequelize.define('tareas', {
    id:{type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: {type: Sequelize.STRING, allowNull: false},
    fec_ini: {type: Sequelize.DATE, allowNull: false},
    fec_venc: {type: Sequelize.DATE, allowNull: true},
    fec_fin: {type: Sequelize.DATE, allowNull: true}
});

  module.exports = Tareas;