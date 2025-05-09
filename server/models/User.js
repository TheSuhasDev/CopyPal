const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    noteContent: {
        type: String,
        required: true
    }
});
// user-schema model comment
const userschema=new mongoose.Schema({
    usercode:{
        type:String,
        required:true,
        unique:true
    },
    notes:{
        type:[noteSchema],
        default: []
    }
})

const User=mongoose.model('User',userschema);
module.exports=User

