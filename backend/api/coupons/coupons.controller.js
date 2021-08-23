const logger = require('../../services/logger.service');
const couponsService = require('./coupons.service');

async function getCoupons(req, res) {
    try {
      var coupons = await couponsService.query(res,req.params.title);
    } catch (err) {
      logger.error('Coupons.Controller/getCoupons - returned an error:', err);
      res.status(500).send({ error: 'coupons.Controller/getCoupons - returned an error:', err });
    }
  }

  async function getByTitle(req,res){
    try {
      console.log("orderBy",req.body.orderBy)
      var coupons = await couponsService.query(res,req.params.title);
    } catch (err) {
      logger.error('Coupons.Controller/getCoupons - returned an error:', err);
      res.status(500).send({ error: 'coupons.Controller/getCoupons - returned an error:', err });
    }
  }

  async function getByTitleOrderBy(req,res){
    try {
      console.log("orderBy",req.body.orderBy)
      var coupons = await couponsService.query(res,req.params.title,req.body.orderBy);
    } catch (err) {
      logger.error('Coupons.Controller/getCoupons - returned an error:', err);
      res.status(500).send({ error: 'coupons.Controller/getCoupons - returned an error:', err });
    }
  }
  module.exports = {
    getCoupons,
    getByTitle,
    getByTitleOrderBy,
  };
  