const User = require('../models/userModel')
const Otp = require('../models/OtpModel')
const sendOTP = require('../util/otpSender')
const login = async (req ,res)=>{
    const {phone} = req.body
    if(!phone){
        return res.status(400).send('Please fill all the fields')
    }
    const user = await User.findOne({phone})
    if(!user){
        return res.status(400).send('User does not exist') 
    }
    const token  = await user.generateJWT()
    res.cookie('token' , token , {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
        httpOnly: true,
        // secure: true,
    })
    res.status(200).json({
        success: true,
        message:"LoggedIn successfully",
        token:token
    })
}
const register = async(req ,res)=>{
    const {name , restroname , email } = req.body

 try{
    if(!name || !restroname ){
        return res.status(400).send('Please fill all the fields')
     }
 
    isRestroExit =  await User.findOne({restroname})
    if(isRestroExit){
        return res.status(400).send('Restro already exist')
    }
    
    const user = new User({
     name,
     restroname,
     email 
    
    
     
 })
 
 await user.save()
 
 
 const token = await user.generateJWT()
    res.cookie('token', token , {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
        httpOnly: true,
        // secure: true,
       
    })
 
 res.status(201).json({
     success: true,
     message:"Registered successfully",
     user,
     token
 })
 }catch(e){
     console.log(e.errorResponse)
     return res.status(500).json(e.errorResponse)
 }

}

const sendOtp = async(req,res)=>{
    const userid = req.params.id
    const {phone} = req.body
    if(!phone){
        return res.status(400).send('Please fill all the fields')
    }
    const user = await User.findById(userid)
    if(!user){
        return res.status(404).send('User not found')
    }
  
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
  const expiresAt = new Date(Date.now() + 10 * 60000); // Set expiry time to 10 minutes from now

  sendOTP(otpCode , phone)
    const otp = new Otp({
        phone,
        otp: otpCode,
        expiresAt

    })
    await otp.save()
    const addPhone  = await User.findByIdAndUpdate(userid , {
        $set:{
            phone:phone
        }
    })
    const token = await user.generateJWT()
    res.cookie('token', token , {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
        httpOnly: true,
        // secure: true,
       
    })
    res.status(201).json({
        message: "OTP sent Successfully",
        success: true,
        phone,
        token

       
        
    })


}

const verifyOtp = async(req, res)=>{
    const {otp , phone} = req.body
try{
    if(!otp){
        return res.status(400).send('Please fill all the fields')
    }
    if(!phone){
        return res.status(400).send('Please fill all the fields')
    }
    
    const userPhone = await User.findOne({phone})
    if(!userPhone){
        return res.status(400).send('phone not found')
    }
    const otpData = await Otp.findOne({otp})
    if(!otpData){
        return res.status(400).send('Invalid OTP')
    }
    if(otpData.expiresAt < Date.now()){
        return res.status(400).send('OTP expired')
    }
    await Otp.deleteOne({otp})
    await User.findOneAndUpdate({phone} , {
        isVerified: true
    
    })

    res.status(201).json({
        message: "OTP verified Successfully",
       
        success: true
    })
}catch(e){
    console.log(e)
    return res.status(500).json(e)
}
}


module.exports = {
    login , 
    register ,
    sendOtp,
    verifyOtp
}