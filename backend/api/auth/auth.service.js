const bcrypt = require('bcrypt')
// const userService = require('../user/user.service')
const dbService = require('../../services/db.service');

// const logger = require('../../services/logger.service')

const saltRounds = 3

async function login(email, password,res,req) {
    // logger.debug(`auth.service - login with email: ${email}`)
    if (!email || !password) return Promise.reject('email and password are required!');
    var conDB = await dbService.getCollection();
    try {
       conDB.connect(  function(err) {
        if (err) throw err;
        console.log("Connected!");
      }); 
  
      conDB.query(`SELECT * FROM users WHERE email = '${email}'  `, async function (err, results) {
        if (err) {
          console.log("ERROR query--->",err); 
          throw err; 
        }
        let user = JSON.parse(JSON.stringify(results))[0];
        if (!user) return Promise.reject('Invalid email or password');
        const match = await bcrypt.compare(password, user.password);
        if (!match) return Promise.reject('Invalid email or password');
        delete user.password;
        user.status = "OK"
        req.session.user = user;
        res.json(user);
      });   

      conDB.end();
    } catch (err) { 
      console.log(`ERROR: while finding user ${email}`); 
      console.log(`ERROR: --->${err}`);
      throw err;
    }
    // await console.log("user -> ********", user )
}

async function signup(googleId,firstName, lastName, password, phone, email, clubs , imgUrl,req, res) {
  if (!email || !password || !firstName || !lastName) return Promise.reject('email, username and password are required!')
  if (clubs === undefined ) clubs = null;
  const hash = await bcrypt.hash(password, saltRounds)
  var conDB = await dbService.getCollection();
      try {
         conDB.connect(  function(err) {
          if (err) throw err;
          console.log("Connected!");
        }); 
    
        conDB.query(`SELECT * FROM users WHERE email = '${email}'  `, async function (err, results) {
          if (err) {
            console.log("ERROR query--->",err); 
            throw err; 
          }
          if (results.length === 0){
            conDB.query(`INSERT INTO users (firstName , lastName, phone ,email , password , clubs) VALUES ('${firstName} ', '${lastName}', '${phone}', '${email}', '${hash}' , '${clubs}')  `,
            async function (err, results) {
              if (err) {
                console.log("ERROR query--->",err); 
                throw err; 
              }
              let user ={};
              // user = JSON.parse(JSON.stringify(results));
              // console.log(" user -------> ",user)
              // res.send(user)
              // googleId,firstName, lastName, password, phone, email, clubs , imgUrl
              user.email = email
              user.password = password
              user.status = "OK"
              req.session.user = user;
              res.json(user)
              conDB.end();
            });  
            
          }else{
            console.log("USER ALLREDY EXIST ");
            let user = {};
            user.status = "USER ALLREDY EXIST"
            // res.send(user)
            res.json(user)
            conDB.end();
          }
          
        });    

        // conDB.end();
  
      } catch (err) { 
        console.log(`ERROR: while finding user ${email}`); 
        console.log(`ERROR: --->${err}`);
        throw err;
      }
}

module.exports = {
    login,
    signup,
}