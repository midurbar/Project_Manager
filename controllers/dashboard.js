function dashboard(req, res){
    const usuarios= req.session.usuarios;

    if (usuarios) {
        res.render('dashboard',{usuarios})
    } else {
        res.redirect('/login')
    }
}


module.exports = {
    dashboard
}