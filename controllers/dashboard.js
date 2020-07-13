function dashboard(req, res){
    const usuarios= req.session.usuarios;

    res.render('dashboard',{usuarios})
    
}


module.exports = {
    dashboard
}