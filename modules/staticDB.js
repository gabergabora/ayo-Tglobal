const mongoose = require("mongoose")


const normalInvestment = mongoose.Schema({
    title : String,
    roi : Number,
    duration : Number,
    min : Number,
    max : Number,
})

const NORMAL = mongoose.model("investment", normalInvestment)

module.exports = NORMAL
