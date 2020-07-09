const Sequelize = require('sequelize');
const sequelize =require ('./db');

const Proyectos = sequelize.define('proyectos', {
    id:{type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    nombre:{type: Sequelize.STRING, allowNull: false},
    descripcion: {type: Sequelize.TEXT, allowNull: true},
    fec_ini: {type: Sequelize.DATE, allowNull: false},
    fec_fin: {type: Sequelize.DATE, allowNull: true}
});

  module.exports = Proyectos;