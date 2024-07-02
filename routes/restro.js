const express = require('express')

const router = express.Router()
const isAuthenticated = require('../middleware/authMiddleware')
const { getDetail , uploadMenu , deleteMenu , getMenu , chooseDomain } = require('../controller/restroController')
const upload = require('../middleware/multerMiddleware')

router.get('/get-detail' , isAuthenticated  , getDetail)
router.post('/upload/menu' , isAuthenticated , upload.array('menu' , 5) , uploadMenu)
router.post('/delete/menu' ,  isAuthenticated , deleteMenu)
router.post('/choose/domain' ,  isAuthenticated , chooseDomain)





module.exports = router
