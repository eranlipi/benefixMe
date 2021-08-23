const { urlencoded } = require('body-parser');
const dbService = require('../../services/db.service');

 async function query(res,filterBy=null,orderBy=null) {
   console.log("filterBy ",filterBy);

    var conDB = await dbService.getCollection(); 
    try {
         conDB.connect(  function(err) {
          if (err) throw err;
          console.log("Connected!");
        }); 

      if (filterBy !== null && orderBy === null ){
        await getByTitle(filterBy , res , conDB)
      }else if (orderBy !== null ){
        getByTitleOrderBy (filterBy,res, conDB ,orderBy)
      } else{
          conDB.query("SET character_set_results=utf8");
          conDB.query('SELECT  * FROM coupon',  function (err, results) {
            if (err) throw err;
            let tempJs = JSON.parse(JSON.stringify(results));
			  	  tempJs.func = "query";

            res.send(tempJs);
          }); 
        }
        conDB.end()
      } catch (err) {
        console.log("ERROR: ->",err);
        throw err;
      } 
      
    } 

  async function getByTitle (title,res, conDB ){
    conDB.query("SET character_set_results=utf8");
    conDB.query("SET character_set_client=utf8");
    conDB.query("SET character_set_connection=utf8");
    conDB.query("SET character_set_database=utf8");
    conDB.query("SET character_set_server=utf8");
    conDB.query(`SELECT  * FROM coupon where title LIKE '${title}%' order by priceNum ASC `,  function (err, results) {
      if (err) throw err;
      let tempJs = JSON.parse(JSON.stringify(results));
		tempJs.func = "getByTitle";
		
      res.send(tempJs);
    });  
}

async function getByTitleOrderBy (title,res, conDB ,orderBy){
  conDB.query("SET character_set_results=utf8");
  conDB.query("SET character_set_client=utf8");
  conDB.query("SET character_set_connection=utf8");
  conDB.query("SET character_set_database=utf8");
  conDB.query("SET character_set_server=utf8");
  conDB.query(`SELECT  * FROM coupon where title LIKE '${title}%' and priceType = '${orderBy}' order by priceNum ASC `,  function (err, results) {
    if (err) throw err;
    let tempJs = JSON.parse(JSON.stringify(results));
	  tempJs.func = "getByTitleOrderBy";
    res.send(tempJs);
  });   
}

module.exports = {
    query,
  };
  