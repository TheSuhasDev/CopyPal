const User = require("../models/User");

const fetchusercontroller=async(req,res)=>{
    const {id}=req.params;
    try{
        const founduser=await User.findById(id);
        if(!founduser){
            res.status(400).json({
                success:false,
                message:'Could not find User'
            })
        }
        res.status(200).json({
            success:true,
            message:'Found user successfully',
            user:founduser
        })
    }catch(e){
        console.log(e);
    }
}

module.exports=fetchusercontroller;