const express = require("express")
const adminRoute = express.Router()


adminRoute.use(function(req,res,next){
    res.locals.URL = req.url
    next()
})

adminRoute.get("/login", function(req,res){
    res.render("admin/admin-login")
})

adminRoute.get("/dashboard", function(req,res){
    res.render("admin/admin-dashboard")
})

adminRoute.get("/updatePlans", function(req,res){
    res.render("admin/admin-updatePlans")
})

adminRoute.get("/deposit", function(req,res){
    res.render("admin/admin-deposits")
})

adminRoute.get("/withdraw", function(req,res){
    res.render("admin/admin-withdraw")
})

adminRoute.get("/account", function(req,res){
    res.render("admin/admin-account")
})
module.exports = adminRoute