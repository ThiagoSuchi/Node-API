const Login = require('../models/LoginModel.js');

exports.index = (req, res) => {
    res.render('login');
}

exports.register = async (req, res) => {
   try{
    const login = new Login(req.body);
    await login.register();

    if(login.errors.length > 0) {
        req.flash('errors', login.errors);
        req.session.save(function() {
           return res.redirect('back');// reedireciona o usuário para a página anterior
        });
        return;
    }

    req.flash('success', 'Usuário foi cadastrado com sucesso.');
        req.session.save(function() {
           return res.redirect(req.get('referrer' || '/'));// reedireciona o usuário para a página anterior
        });
   } catch (err) {
    console.log(err);
    res.render('404');
   }
    
}