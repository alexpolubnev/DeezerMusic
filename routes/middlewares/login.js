const Users = require('../../models/users');

const checkLogPas = async function (req, res, next){
  const { login, password } = req.body;
  const user = await Users.findOne({ login, password });
  if (user){
    req.session.user = login;
    next();
  }else {
    res.render('login', {error:true});
  }
}


module.exports = checkLogPas;
