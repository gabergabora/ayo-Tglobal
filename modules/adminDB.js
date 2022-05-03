const md5 = require("md5")
const mongoose = require("mongoose")


const normalInvestment = mongoose.Schema({
    title : {required : true, type : String},
    roi : {required : true, type : Number},
    duration : {required : true, type : Number},
    min : {required : true, type : Number},
    max : {required : true, type : Number},
})

const cyclesInvestment = mongoose.Schema({
    title : String,
    roi : Number,
    min : Number,
    max : Number,
    days_cycle : Number,
    min_cycle_b4_with : Number,
})
const adminSchema = mongoose.Schema({
    name : String,
    username : String,
    password : String,
    admin : Boolean,
    accounts : [{title : String, address: String}],
    normalInvestments : [normalInvestment],
    cyclesInvestment,
    // they only want one cycle
    // payment geteway
}, {minimize : false})

const ADMIN = mongoose.model('admin', adminSchema)
// const NORMAL = mongoose.model('investments', normalInvestment)

module.exports = ADMIN