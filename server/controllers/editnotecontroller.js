const User = require("../models/User");


const editnote=async(req,res)=>{
    const {id}=req.params;
    const {title,noteContent,index}=req.body;
    try{
        const user=await User.findById(id);
        if(!user){
            console.log('could not find user with this id')
            res.status(400).json({
                success:false,
                message:'could not find user with this id'
            })
        }
        user.notes[index]={title,noteContent};
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Note added successfully",
            user
        })
    }catch(e){
        console.error("Error updating note:", e);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }

}

module.exports=editnote;