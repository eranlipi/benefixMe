const dbService = require('../../services/db.service');

async function query(filterBy = {}) {
  const collection = await dbService.getCollection();
  return collection
}


module.exports = {
  query,
};
