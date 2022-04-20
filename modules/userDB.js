const mongoose = require("mongoose")
// for some reason node v17 needs 127.0.0.1 in the connection instead of localhost
mongoose.connect("mongodb://127.0.0.1:27017/temenosG",
function(req,res){
    console.log("DB connected successfully")
})

const transaction = mongoose.Schema({
    user : String,
    title : String,
    amount : Number,
    imageurl : String,
    means : {type : String, default : "USDT"},
    status : {type : String, default : "pending"},
    confirmed : {type : Boolean, default : false}, 
}, {timestamps : true})


const normalInvestment = mongoose.Schema({
    title : String,
    roi : Number,
    duration : Number,
    expiry : Number,
    amount : Number,
    paid : {type : Boolean, default : false},
    profit : Number
})

const userSchema = mongoose.Schema({
    email : {type : String,  required : [true, "make sure all inputs are filled"],},
    password :{type : String,required : [true, "make sure all inputs are filled"],},
    firstName :{type : String,required : [true, "make sure all inputs are filled"],},
    lastName : {type : String,required : [true, "make sure all inputs are filled"]},
    fundingBallance : {type : Number, default : 0},
    shortBallance : {type : Number, default : 0},
    cyclesBallance : {type : Number, default : 0},
    client : {type : Boolean, default : false},
    normalInvestments: [normalInvestment],
    referrals : [String],
    walletAddress : String,
    lastLoggedIn : Date,
}, {
    minimize : false,
    timestamps : true,
})

require("./staticDB")

USER = mongoose.model("user", userSchema)
TRANSACTION = mongoose.model("transactions", transaction)

module.exports.USER = USER
module.exports.TRANSACTION = TRANSACTION