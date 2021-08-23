// const MongoClient = require('mongodb').MongoClient;
const mysql = require('mysql');
const iconv = require("iconv-lite");
var buf = iconv.encode("weird characters", "utf8");
// const config = require('../config');

module.exports = {
  getCollection,
  
};



// Database Name
var dbConn = null; 

async function getCollection(collectionName = null) {
  var con = mysql.createConnection({ 
    // charset : 'utf8',
    host: "benefix-me.com",
    user: "benefix-me_newuser",
    password: "v5D4Kb0Ps!",
    database : "admin_benefix-me_new",
    charset : "utf8",
    multipleStatements: true,

  }); 
  console.log("getCollection - > ")
  // var res = await myConnect();
  // console.log(res)
  return con
}

async function myConnect() {
  console.log("myConnect - > ") 
  // if (dbConn) return dbConn;
  try {

    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");

    });
    
    
  } catch (err) {
    console.log("ERROR: ->",err);
    throw err;
  }
}
