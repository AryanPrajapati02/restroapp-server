    const mongoose = require('mongoose')

    const otpSchema = new mongoose.Schema({
        
        otp:{
            type:String,
            required:true
        },
        phone:{
            type:Number,
            required:true
        },
        verified: {
            type: Boolean,
            default: false,
          },
        createdAt:{
            type:Date,
            default:Date.now()
       },
       expiresAt: {
        type: Date,
        required: true,
      }

    })
    otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
    const Otp = mongoose.model('Otp', otpSchema)
    module.exports = Otp