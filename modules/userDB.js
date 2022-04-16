const mongoose = require("mongoose")
// for some reason node v17 needs 127.0.0.1 in the connection instead of localhost
mongoose.connect("mongodb://127.0.0.1:27017/temenosG",
function(req,res){
    console.log("DB connected successfully")
})

const History = mongoose.Schema({
    title : String,
    amount : Number,
    means : {type : String, default : "USDT"}
}, {timestamps : true})
const userSchema = mongoose.Schema({
    email : {type : String,  required : [true, "make sure all inputs are filled"],},
    password :{type : String,required : [true, "make sure all inputs are filled"],},
    firstName :{type : String,required : [true, "make sure all inputs are filled"],},
    lastName : {type : String,required : [true, "make sure all inputs are filled"]},
    fundingBallance : {type : Number, default : 0},
    shortBallance : {type : Number, default : 0},
    cyclesBallance : {type : Number, default : 0},
    History : [History],
    walletAddress : String,
    lastLoggedIn : Date,
}, {
    minimize : false,
    timestamps : true,
})

USER = mongoose.model("user", userSchema)

module.exports.USER = USER