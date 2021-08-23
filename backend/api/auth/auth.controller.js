const authService = require('./auth.service');
const { urlencoded } = require('body-parser');
const logger = require('../../services/logger.service');

async function login(req, res) {
  const { email, password } = req.body;
  console.log("req.body",req.body); 
  // console.log("password --> ",password);
  try {
    const user = await authService.login(email, password,res,req);
    // req.session.user = user;
    // res.json(user);
    
  } catch (err) {
    res.status(401).send({ error: err });
  }
}

async function signup(req, res) {
  try {
    const { googleId,firstName, lastName,password1, phone, email, imgUrl ,clubs} = req.body;
    const account = await authService.signup(googleId,firstName, lastName, password1, phone, email,  imgUrl,clubs,req, res);
    // logger.debug(`auth.route - new account created: ` + JSON.stringify(account));
    // const user = await authService.login(email, password);
    // req.session.user = user;
    // res.json(user);
  } catch (err) {
    logger.error('[SIGNUP] ' + err);
    res.status(500).send({ error: 'could not signup, please try later' });
  }
}

// async function logout(req, res) {
//   try {
//     console.log(req);
    
//     req.session.destroy();
//     console.log('logged out successfully')
//     res.send({ message: 'logged out successfully' });
//   } catch (err) {
//     res.status(500).send({ error: err });
//   }
// }

module.exports = {
  login,
  signup,
  // logout,
};
