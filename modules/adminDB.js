const mongoose = require("mongoose")


const normalInvestment = mongoose.Schema({
    title : {required : true, type : String},
    roi : {required : true, type : Number},
    duration : {required : true, type : Number},
    min : {required : true, type : Number},
    max : {required : true, type : Number},
})
const adminSchema = mongoose.Schema({
    name : String,
    username : String,
    password : String,
    admin : Boolean,
    accounts : [{title : String, address: String}],
    normalInvestments : [normalInvestment],
    // payment geteway

})

const ADMIN = mongoose.model('admin', adminSchema)
// const NORMAL = mongoose.model('investments', normalInvestment)

module.exports = ADMIN




