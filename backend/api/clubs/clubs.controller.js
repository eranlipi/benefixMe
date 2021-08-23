const bcrypt = require('bcrypt')
const logger = require('../../services/logger.service');
const dbService = require('../../services/db.service');

async function getClubs(req, res) {
    var conDB = await dbService.getCollection();
   
    try {

        conDB.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
        });
        // conDB.query("SET character_set_client=utf8");
        // conDB.query("SET character_set_connection=utf8");
        // conDB.query("SET character_set_database=utf8");
        // conDB.query("SET character_set_server=utf8");
        conDB.query("SET character_set_results=utf8");
        conDB.query('SELECT id as club_id ,name  FROM `club`', function (err, results) {
            if (err) throw err;
            let tempJs = JSON.parse(JSON.stringify(results));
            res.send(tempJs);
            return;
        });
        conDB.end()
    } catch (err) {
        logger.info("ERROR: ->", err);
        throw err;
    }

}
async function getGetClubsByUserId(req, res) {
    var conDB = await dbService.getCollection();
    try {

        conDB.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
        });
        conDB.query("SET character_set_results=utf8");
        conDB.query(`SELECT uc.user_id ,uc.club_id ,uc.name  FROM userClubs as uc INNER JOIN clubs as c on c.id = uc.club_id WHERE us.user_id = ${userId}`, function (err, results) {
            if (err) throw err;
            let tempJs = JSON.parse(JSON.stringify(results));
            res.send(tempJs);
            return;
        });
        conDB.end()
    } catch (err) {
        logger.info("ERROR: ->", err);
        throw err;
        // return;
    }
}



module.exports = {
    getClubs,
    getGetClubsByUserId
};
