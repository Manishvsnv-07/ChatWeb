import mongoose from "mongoose"

const ChatSchema = mongoose.Schema(
    {
    roomId:{type:String},
    senderId:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    receiverId:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    text:{type:String},
    read:{type:Boolean,default:false}
    },
    { timestamps:true }

)

export const chat = mongoose.model("chat",ChatSchema)
