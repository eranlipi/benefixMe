const express = require('express')
const {requireAuth}  = require('../../middlewares/requireAuth.middleware')
const {login,signup} = require('./auth.controller')
// const {login, signup, logout} = require('./auth.controller')

const router = express.Router()
console.log("router auth")
router.post('/login', login)
router.post('/signup', signup)
// router.post('/logout', logout)

module.exports = router