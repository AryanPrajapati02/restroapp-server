const User = require('../models/userModel')
const cloudinary = require('cloudinary')
const fs = require('fs')

const getDetail = async(req, res)=>{
    const user  = req.user
    // console.log(user.id)
    const userDetail = await User.findById(user)
     return  res.status(200).json(userDetail)

}
const uploadMenu = async(req ,res)=>{
    try{
        const user = req.user
        const file = req.files.map((item)=> item.path)
        console.log(file)
        for(const img of file){
         

            const result = await cloudinary.v2.uploader.upload(img) 
             
            const menu = await User.findByIdAndUpdate(user._id,{
                $push:{
                    menuImg : {
                        url: result.secure_url,
                        public_id: result.public_id
                    }
                   
                }
            })

            fs.unlink(img , function(e){
                if(e){
                    console.log(e)
                    return res.status(500).json(e)
                }
                console.log('file deleted')
            })
        }
     
const menu =  await User.findById(user._id)
       
        return res.status(200).json({
            success: true,
          message:"Uploaded Successfully",
          menu: menu.menuImg,
         
          
       
    
        })
    }
    catch(err){
        return res.status(500).json(
            {
                success: false,
                message: err.message || "Server Error"
            }
        )
    }
}

const deleteMenu = async(req ,res)=>{
   const user  = req.user
    const {public_id} = req.body
  


    // console.log(menu)
    try {
        const result = await cloudinary.uploader.destroy(public_id);
        if (result.result === 'ok') {
            const menu = await User.findByIdAndUpdate(
              user._id,
                { $pull: { menuImg: { public_id:  public_id } } },
                { new: true }
              );
          return res.status(200).json({ message: 'Image deleted successfully' ,
            success:true,
            public_id,
          });
        } else {
          return res.status(400).json({ error: 'Failed to delete image' });
        }
      } catch (error) {
        console.error('Error deleting image:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    // return res.status(200).json({
    //     success: true,
    //     message:"Deleted Successfully",
    //     menu
    // })

}
const chooseDomain = async(req,res)=>{
    const user  = req.user
    // console.log(id)
    const {domain} = req.body
    const updatedUser = await User.findByIdAndUpdate(user.id,{domain})
    const updateddomainStatus = await User.findByIdAndUpdate(user.id,{
        domainStatus: true
    })

    return res.status(200).json({
        success: true,
        message:"Domain updated Successfully",
        domain : req.body
       
    })
}

const getMenu = async(req ,res)=>{
    const menu  = req.params.menu
    // console.log(menu)
    const user = await User.findOne({domain:menu})
    if(!user){
        return res.status(404).send('Menu not found')
    }
    return res.status(200).json({
        success: true,
        message:"Menu fetched successfully",
        menu: user.menuImg,
        restroname: user.restroname,
        domain: user.domain,
        name: user.name,
        offer: user.offers
       


        
    })
}
const findDomain = async(req, res)=>{
    const {domain} = req.body
    if(!domain){
        return res.status(404).json({message: "domain is requires"})
    }
    const restro = await User.findOne({domain : domain})
     return res.status(201).json({
        message: "domain found",
        restro

     })

}




module.exports = {
    getDetail,
    uploadMenu,
    deleteMenu,
    getMenu ,
    chooseDomain,
    findDomain
}