const sequelize= require('./db');
const Proyectos= require('./proyectos.js');
const Roles= require('./roles.js');
const Tareas= require('./tareas.js');
const Usuarios= require('./usuarios.js');


//Comentario porque si
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
      Usuarios
  }