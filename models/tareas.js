const Sequelize = require('sequelize');
const sequelize =require ('./db');

const Tareas = sequelize.define('tareas', {
    id:{type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: {type: Sequelize.STRING, allowNull: false},
    fec_ini: {type: Sequelize.DATE, allowNull: false},
    fec_venc: {type: Sequelize.DATE, allowNull: true},
    fec_fin: {type: Sequelize.DATE, allowNull: true}
});

  module.exports = Tareas;