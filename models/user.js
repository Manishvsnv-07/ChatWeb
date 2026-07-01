import mongoose from "mongoose"

const Userschema = mongoose.Schema({
    email:{type:String,require:true},
    avatar:{type:String,default:"/imgs/default.png"},
    name:{type:String},
    username:{type:String},
    password:{type:String},
    gender:{type:String},
    status:{type:String},
    country:{type:String},
    countrycode:{type:String},
    Friends:[{type:mongoose.Schema.Types.ObjectId,ref:"user"}],
    isOnline:{type:Boolean,default:false},
    lastSeen: { type: Date, default: Date.now }
})

export const user = mongoose.model('user',Userschema) 