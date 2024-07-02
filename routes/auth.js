const express = require('express')

const router = express.Router()
const {login , register , 
    sendOtp , verifyOtp

} = require('../controller/authController')
const { isAuthenticated } = require('../middleware/authMiddleware')

router.post('/login' , login)

router.post('/register' , register)
// router.get('/send-otp',isAuthenticated ,sendOtp )
router.post('/send-otp/:id',sendOtp )
router.post('/verify-otp', verifyOtp)

module.exports = router