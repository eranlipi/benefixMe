const express = require('express')
const { getClubs} = require('./clubs.controller')
const router = express.Router()

router.get('/', getClubs)
module.exports = router