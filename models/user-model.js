const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        minLength:6,
        maxLength:255,
    },

    googleID:{
        type:String,
    },

    date:{
        type: Date,
        default:Date.now,

    },

    thumbnail:{
        type:String,
    },

    //  local login 使用本地登入
    email:{
        type:String,
        maxLength:1024,

    },

    password: {
        type:String,
        maxLength:1024,
        minLength:6,
    },
});

module.exports = mongoose.model("User" , userSchema);