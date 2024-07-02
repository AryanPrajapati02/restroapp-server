const express = require('express')

const router = express.Router()

const { getMenu } = require('../controller/restroController')




router.get('/get/:menu' , getMenu)

module.exports = router