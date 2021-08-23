const express = require('express')
const { getCoupons ,getByTitle,getByTitleOrderBy} = require('./coupons.controller')
const router = express.Router()

router.get('/', getCoupons)
router.get('/:title', getByTitle)
router.post('/orderBy/:title', getByTitleOrderBy)
module.exports = router