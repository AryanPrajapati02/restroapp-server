const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const UserSchema  =  new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,

        unique:true
    },
   phone:{
    type:Number,
    default: "",
   },
   isAdmin:{
         type:Boolean,
         required:true,
         default:false
   },
   domain:{
            type:String,
           
   },
   domainStatus:{
     type:Boolean,
     default:false
   },

   offers:[{
         type:mongoose.Schema.Types.ObjectId,
         ref:'Offer'
    
   }],
   restroname:{
            type:String,
            required:true
   },
   menuImg:[{ 
     public_id:{
    type : String,
   
          },
    url:{
        type : String,
        
    }}],
   isVerified:{
     type:Boolean,
     required:true,
     default:false
   },

    createdAt:{
         type:Date,
         default:Date.now
    }



})

UserSchema.methods.generateJWT = async function(){
   try{
    const user = this
    const token = jwt.sign({id:user._id} , process.env.JWT_SECRET , {expiresIn:process.env.JWT_EXPIRES_IN})
    return token

   }catch(e){
    console.log(e)
   }
}

module.exports = mongoose.model('User' , UserSchema)
