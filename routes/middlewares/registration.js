const Users = require('../../models/users');

const checkUserToBd = async function (req, res, next){
  const { login, password } = req.body;
  const user = await Users.findOne({ login, password });  
  if (user){
    res.render('registr', {error:true});
  }else {
    Users.create({ login, password });
    req.session.user = login;
    next();
  }
}


module.exports = checkUserToBd;
