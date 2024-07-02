const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./util/db')
const cookieParser = require('cookie-parser')
const cloudinary = require('cloudinary').v2
const port  = 5000;
const corsOption = {
 
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // Allow non-browser requests
    // /^https:\/\/([a-zA-Z0-9-]+\.)?mykitab\.live(:[0-9]+)?$/ ||
        const allowedDomain =  /^http?:\/\/([a-zA-Z0-9-]+\.)?localhost(:[0-9]+)?$/
       
;
        if (allowedDomain.test(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    
    credentials:true,
    allowedHeaders:['Content-Type','Authorization'],
    exposedHeaders:['Content-Type','Authorization'],
    methods:['GET','POST','PUT','PATCH','DELETE'],
    preflightContinue:false,
    optionsSuccessStatus:204,
    

}

 app.use(cors(corsOption))
// app.use(express.urlencoded({ extended: true }))

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME ,                        
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})
app.use(express.json())
app.use(cookieParser())
const router = require('./routes/auth')
 const menuRoute = require('./routes/menuRoute')
const restroRoute = require('./routes/restro')
app.use('/api/v1' , menuRoute)
    
app.use('/api/v1' , restroRoute)
app.use('/api/v1' , router)
app.get('/' , (req ,res)=>{
    res.send('hello world')
})
connectDB()
app.listen(port , ()=>{
    console.log(`Server is running on  http://localhost:${port}`)
})