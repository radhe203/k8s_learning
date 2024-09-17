import mongoose from "mongoose"


const emailSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    }
})


const Email = mongoose.model("Email",emailSchema)

export default Email