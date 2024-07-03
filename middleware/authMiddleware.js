const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const isAuthenticated = async(req, res,next)=>{
    try {
        const headerToken = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    
    const cookieToken = req.cookies.token;
    const token = headerToken || cookieToken;
    // console.log(token)
        if(!token){
            return res.status(401).json({msg:'No token, authorization denied'})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)
        req.user = user
        
        // console.log(req.user)

        next()
    } catch (error) {
        res.status(401).json({msg:'Token is not valid'})
    }
}

module.exports = isAuthenticated
