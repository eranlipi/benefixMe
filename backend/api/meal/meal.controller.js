const logger = require('../../services/logger.service');
const mealsService = require('./meal.service');

async function getMeals(req, res) {
  try {
    // const meals = await mealsService.query(req.query);
    const meals = await mealsService.query();
    // res.send(meals);
  } catch (err) {
    logger.error('Meal.Controller/getMeals - returned an error:', err);
    res.status(500).send({ error: 'Meal.Controller/getMeals - returned an error:', err });
  }
}


module.exports = {
  getMeals,

};
