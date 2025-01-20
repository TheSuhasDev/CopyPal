const User = require("../models/User");


const loginuser=async(req,res)=>{

    const {usercode}=req.body;
    const existinguser=await User.findOne({usercode:usercode})
    if(!existinguser){
        console.log('not an existing user')
        newuser=new User({
            usercode:usercode
        })
        try{
            const saveduser=await newuser.save();
            res.status(200).json({
                success:true,
                message:'New user saved successfully',
                user:saveduser
            })
        }catch(err){
            console.log(err);
            res.status(400).json({
                success:false,
                message:'Error in creating user',
            })
        }
    }else{
        res.status(200).json({
            success:true,
            message:'User found successfully',
            user:existinguser
        })
    }
}
module.exports=loginuser;