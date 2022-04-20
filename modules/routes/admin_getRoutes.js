const express = require("express")
const { USER } = require("../userDB")
const adminRoute = express.Router()
const {formatDistanceToNow, format} = require("date-fns")


adminRoute.use(async function(req,res,next){
    res.locals.users = await USER.find({})
    res.locals.reqUrl = req.url
    res.locals.formatDistanceToNow = formatDistanceToNow
    res.locals.format = format
    next()
})
// remember this thing with the title always returns the withdraw doc
const getTransactions = function(title){
    return function(req,res,next){
       return USER.find( {'transactions.title': title} , {_id : 0, "transactions": 1, email: 1}, function(err,data){
            if(err) return res.send("error getting users transactions")
            console.log(data[0])
            res.locals.transactionsArr = data
            return next()
        })
    }
}




adminRoute.get("/login", function(req,res){
    res.render("admin/admin-login")
})

adminRoute.get("/dashboard", function(req,res){
    res.render("admin/admin-dashboard")
})

adminRoute.get("/updatePlans", function(req,res){
    res.render("admin/admin-updatePlans")
})

adminRoute.get("/deposit", getTransactions('deposit'), function(req,res){
    res.render("admin/admin-deposits")
})

adminRoute.get("/withdraw",getTransactions('withdraw'), function(req,res){
    res.render("admin/admin-withdraw")
})

adminRoute.get("/loan", function(req,res){
    res.render("admin/admin-loan")
})

adminRoute.get("/account", function(req,res){
    res.render("admin/admin-account")
})
module.exports = adminRoute