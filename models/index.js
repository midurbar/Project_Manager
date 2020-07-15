const sequelize= require('./db');
const Proyectos= require('./proyectos');
const Roles= require('./roles');
const Tareas= require('./tareas');
const Usuarios= require('./usuarios');
const Intervencion = require('./intervencion');

//Relaciones entre entidades

Usuarios.belongsToMany(Proyectos, {through: 'participaciones'})
Proyectos.hasMany(Tareas)
Tareas.belongsToMany(Usuarios, {through: 'asignaciones'})
Usuarios.belongsToMany(Tareas, {through: 'asignaciones'})
Tareas.hasMany(Intervencion, {as: 'intervenciones'})
Intervencion.belongsTo(Usuarios)
Intervencion.belongsTo(Tareas)
Usuarios.belongsTo(Roles)
Roles.hasMany(Roles, {as: 'heredados'})


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    sequelize.sync({alter:true});
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  module.exports ={
      sequelize,
      Proyectos,
      Roles,
      Tareas,
      Intervencion,
      Usuarios
  }